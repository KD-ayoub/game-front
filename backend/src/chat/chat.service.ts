import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { Room, RoomType } from "@prisma/client";
import { errorMonitor } from "events";
import { PrismaService } from "prisma/prisma.service";
import { AppGateway } from "src/app.gateway";
import { add_admin, channels, create_channel, join_private_channel } from "src/utils/types";
import * as bcrypt from  'bcrypt'

@Injectable()
export class chatService {
	constructor(private prisma : PrismaService,private appGateway : AppGateway){}

	async get_picture_name(id: string)
	{
		const data = await this.prisma.user.findUnique({
			where: {
				id
			},
			select: {
				nickName: true,
				profile: {
					select: {
						photo_path: true,
					}
				}
			}
		})
		return data;
	}

	async get_all_direct_messages(userid: string)
	{
		const user = await this.prisma.user.findUnique({
			where: {
				id: userid,
			}
		})
		if (!user)
			return "user not found";

		return user;
	}


	async create_a_direct_message(senderId: string,content : Direct_message,rec_sock_id : string,send_sock_id : string)
	{
		try {
			const friendship = await this.prisma.friendship.findFirst({
				where: {
					userId : senderId,
					friendId : content.recieverId,
					is_blocked : false
				}
			});
			if (!friendship)
				return false;
			const dm = await this.prisma.directMessage.create({
				data: {
					content : content.content.message_content,
					senderId,
					receiverId : content.recieverId,
					createdAt: content.content.sended_at,
				}
			});
			if (!dm)
				return false;
		} catch (error) {
			return false;
		}
		return true;
	}

	async get_all_dm_history(senderID: string, recieverID :string)
	{
		let messagehistory : message_history[] = [];
		let dm_history : any;

		try {
			dm_history = await this.prisma.directMessage.findMany({
			where:{
				OR:[
					{
						receiverId:  recieverID,
						senderId: senderID
					},
					{
						receiverId:  senderID,
						senderId: recieverID
					}
				]

 			},
			orderBy:[
				{
					createdAt: 'asc',
				}
			],
			select: {
				createdAt: true,
				content: true,
				receiver:{
					select:{
						nickName: true,
						id: true,
						profile: {
							select:{
								photo_path: true,
							}
						}
					}
				},
				sender:{
					select:{
						nickName: true,
						id: true,
						profile: {
							select:{
								photo_path: true,
							}
						}
					}
				}
			}

		});
			
		} catch (error) {
			// if error send empty array
			return [];
		}

		for (let i : number = 0; i < dm_history.length; i++)
		{
			let node: message_history = {mine : false, sended_at: new Date(), content : '', name: '',picture: ''};
			if (dm_history[i].sender.id == senderID)
			{
				node.mine  = true;
				node.name = "you";
				node.picture = dm_history[i].sender.profile.photo_path;
			}
			else if (dm_history[i].receiver.id == senderID)
			{
				node.mine  = false;
				node.name = dm_history[i].sender.nickName;
				node.picture = dm_history[i].sender.profile.photo_path;
			}
			node.content = dm_history[i].content;
			node.sended_at = dm_history[i].createdAt;
			messagehistory.push(node);
		}

		return messagehistory;
	}

	async get_all_friends(userid :string)
	{
		const friends = await this.prisma.friendship.findMany({
			where: {
						userId : userid
			},
			select: {
				friend : {
					select: {
						id: true,
						nickName: true,
						profile: {
							select: {
								photo_path: true,
							}
						}		
					}
				}
			}
		})
		const reshapedResult = friends.map(user => {
				return {id : user.friend.id,nickname: user.friend.nickName, photo: user.friend.profile.photo_path}
		});
		return reshapedResult;
	}

	
	async block_a_friend(userid: string, friendid: string)
	{
		try {
			const friends = await this.prisma.friendship.update({
				where: {
					userId_friendId: {
						userId: userid,
						friendId: friendid,
					  },
				},
				data:{
					is_blocked: true
				}
			});
			return true;

		} catch (error) {
			return false;
		}
	}
	async unblock_a_friend(userid: string, friendid: string)
	{
		try {
			const friends = await this.prisma.friendship.update({
				where: {
					userId_friendId: {
						userId: userid,
						friendId: friendid,
					  },
				},
				data:{
					is_blocked: false
				}
			});
			return true;

		} catch (error) {
			return false;
		}
	}

	// type : [private | public | protected]
	// password if private : 
	// name 
	async create_channel(obj : create_channel,userid: string)
	{
		try {
			const room = await this.prisma.room.create({
				data: {
					name : obj.name,
					type: obj.type,
					ownerId: userid,
				},
				select: {
					id: true,
				}
			})
			if (obj.type == RoomType.PROTECTED)
			{
				const private_room = await this.prisma.room.update({
					where: {
						id: room.id
					},
					data:{
						password: await this.hash_password(obj.password)
					}
				})
			}

			
		} catch (error) {
			return false;
		}
		return true;
	}

	async hash_password(pass: string)
	{
		//console.log(pass)
		return await bcrypt.hash(pass,10);
	}

	async compare_password(pass:string, hash: string)
	{
		return await bcrypt.compare(pass,hash);
	}

	async create_channel_obj(channel: Room,userid : string): Promise<channels>
	{
		let b : channels = {id : "", joined: false, name : "", type: ""};

		if (channel.type == RoomType.PRIVATE)
		{
			const private_room = await this.prisma.room.findUnique({
				where: {
					id : channel.id,
					type: RoomType.PRIVATE,
					OR: [
						{
							admins: {
								some: 
								{
									id : userid
								}
							}
						},
						{
							members: {
								some: {
									id : userid
								}
							}
						},
						{
							ownerId: userid
						}
					]
				}
			})
			if (private_room)
			{
				b.id = private_room.id;
				b.joined = true;
				b.name = private_room.name;
				b.type = private_room.type;

			}
			return b;
		}
		else
		{
			const rooms  = await this.prisma.room.findUnique({
				where: {
					id: channel.id
				},
				select:{
					name: true,
					id: true,
					type: true,
					password: true,
					admins: {
						select: {
							id : true
						}
					},
					owner: {
						select: {
							id : true
						}
					},
					members: {
						select: {
							id : true
						}
					}

				}
			});
			if (rooms)
			{
				b.id = rooms.id;
				b.name = rooms.name;
				b.type = rooms.type;
				if (rooms.owner.id == userid)
					b.joined = true;
				for (let i = 0; i < rooms.members.length; i++)
				{
					if (rooms.members[i].id == userid)
					{
						b.joined = true;
						break;
					}
				}
				for (let i = 0; i < rooms.admins.length; i++)
				{
					if (rooms.admins[i].id == userid)
					{
						b.joined = true;
						break;
					}
				}
				return b;
			}
		}
		return b;
	}
	async is_muted(userid: string, channel_id : string)
	{
		try {
			const channel = await this.prisma.room.findUnique({
				where : {
					id : channel_id,
					NOT: {
						muted: {
							some : {
								id : userid,
							}
						}
					}
				}
			})
			if (!channel)
				return false;
		} catch (error) {
			return false;
		}
		return true;
	}

	async check_if_user_in_channel(userid: string, channel_id : string)
	{
		try {
			const channel: Room = await this.prisma.room.findUnique({
				where: {
					id  : channel_id,
					OR : [
						{
							members: {
								some: {
									id : userid,
								}
							}
						},
						{
							admins: {
								some: {
									id : userid,
								}
							}
						},
						{
							ownerId : userid
						},
					]
				}
			})
			if (!channel)
				return false;
		} catch (error) {
			return false;
		}
		return true;
	}

	async list_all_channels(userid: string)
	{
		let result : channels[] = [];
		const channels = await this.prisma.room.findMany({
		})
		for (let i = 0; i < channels.length ; i ++)
		{

			const node : channels = await this.create_channel_obj(channels[i],userid);
			if (node.id)
				result.push(node);
			//console.log(node);
		}
		return result;
	}

	async join_public(userid: string, channelid: string)
	{
		try {
			const channel = await this.prisma.room.update({
				where: {
					id: channelid,
					type : RoomType.PUBLIC
					,
					NOT : [
						{
							ownerId: userid,
						},
						{
							members : {
								some : {
									id: userid
								}
							}
						},
						{
							admins: {
								some: {
									id : userid
								}
							}
						},
						{
							banned: {
								some: {
									id : userid
								}
							}
						}
					]
				},
				data: {
					members: {
						connect : {
							id : userid
						}
					}
				}
			});
		} catch (error) {
			return false;
		}
		return true;
	}

	async join_protected(channel : join_private_channel, userid: string)
	{
		try {
			const protected_room = await this.prisma.room.findUnique({
				where: {
					id : channel.id,
					type: RoomType.PROTECTED,
					NOT : [
						{
							ownerId: userid,
						},
						{
							members : {
								some : {
									id: userid
								}
							}
						},
						{
							admins: {
								some: {
									id : userid
								}
							}
						},
						{
							banned: {
								some : {
									id : userid
								}
							}
						}
					]
				},
				select: {
					password: true
				}
			});
			if (protected_room)
			{
				if ( (await this.compare_password(channel.password,protected_room.password) ) === false)
					return 1;
				const join_room = await this.prisma.room.update({
					where: {
						id : channel.id
					},
					data: {
						members: {
							connect: {
								id : userid
							}
						}
					}
				})
				return 3;
			}
		} catch (error) {
			return 2;
		}
		return 2;
	}


	async add_admin(userid: any, channel : add_admin)
	{
		if (userid === channel.member_id)
			return 1;
		try {
			
			const room = await this.prisma.room.update({
				where: {
					id : channel.channel_id,
					members: {
						some : {
							id : channel.member_id
						}
					},
					OR: [
						{
							ownerId: userid
						},
						{
							admins: {
								some : {
									id : userid
								}
							}
						}
					],
					NOT: {
						banned : {
							some: {
								id  : channel.member_id
							}  
						}
					}
				},
				data: {
					admins: {
						connect: {
							id : channel.member_id
						}
					},
					members: {
						disconnect : {
							id : channel.member_id
						}
					}
				}
			});
			if (!room)
				return 2;

		} catch (error) {
			return 2;
		}
	}

	async check_privileges(userid: string, member_id : string, channelid: string)
	{
		try {
			const room = await this.prisma.room.findUnique({
				where: {
					id : channelid,
					OR: [
						{
							ownerId : userid
						},
						{
							admins: {
								some : {
									id : userid
								}
							}
						}
					],
					NOT: [
						{
							ownerId : member_id
						},
						{
							admins: {
								some: {
									id : member_id
								}
							}
						},
						{
							members: {
								some: {
									id : member_id
								}
							}
						},
						{
							banned : {
								some: {
									id  : member_id
								}  
							}
						}
					]
				}
			})
			if (!room)
				return false;
		} catch (error) {
			return false;
		}
		return true;
	}

	async add_member(userid: string ,channel : add_admin)
	{
		if (await this.check_privileges(userid,channel.member_id,channel.channel_id))
		{
			try {
				const room = await this.prisma.room.update({
					where : {
						id : channel.channel_id
					},
					data: {
						members: {
							connect : {
								id : channel.member_id
							}
						}
					}
				})
				if (!room)
					return false;
			} catch (error) {
				return false;
			}
			return true;
		}
		return false;
	}

	async is_admin(userid: string, channelid : string)
	{
		try {
			const room = await this.prisma.room.findUnique({
				where: {
					id : channelid,
					admins: {
						some: {
							id : userid
						}
					}
				}
			})
			if (!room)
				return false;
		} catch (error) {
			return false;
		}
		return true;
	}
	
	async is_owner(userid :string, channelid: string)
	{
		try {
			const room = await this.prisma.room.findUnique({
				where: {
					id : channelid,
					ownerId : userid
				}
			})
			if (!room)
				return false;
		} catch (error) {
			return false;
		}
		return true;
	}

	async is_member(userid :string, channelid: string)
	{
		try {
			const room = await this.prisma.room.findUnique({
				where: {
					id : channelid,
					members: {
						some : {
							id : userid
						}
					}
				}
			})
			if (!room)
				return false;
		} catch (error) {
			return false;
		}
		return true;
	}

	async mute_member(userid: string, channel : add_admin)
	{
		try {
			const room = await this.prisma.room.findUnique({
				where: {
					id : channel.channel_id,
					AND: [
						{
							OR: [
								{
									ownerId : userid
								},
								{
									admins: {
										some : {
											id : userid
										}
									}
								}
							],
							AND: [
								{
									OR: [
										{
											members: {
												some : {
													id: channel.member_id
												}
											},
										},
										{
											admins: {
												some: {
													id : channel.member_id
												}
											}
										}
									]
								}
							]
						}
					]
				}
			})
			if (!room || ( await this.is_admin(userid,channel.channel_id) && await this.is_owner(channel.member_id,channel.channel_id) )) 
				return false;
			if (await this.is_admin(userid,channel.channel_id) && await this.is_admin(channel.member_id,channel.channel_id))
				return false;
			const mute_member = await this.prisma.room.update({
				where: {
					id : channel.channel_id
				},
				data: {
					muted: {
						connect: {
							id : channel.member_id
						}
					}
				}
			})
		} catch (error) {
			return false;
		}
		return true;
	}

	async kick_member(userid: string, channel : add_admin)
	{
		try {
			const room = await this.prisma.room.findUnique({
				where: {
					id : channel.channel_id,
					AND: [
						{
							OR: [
								{
									ownerId : userid
								},
								{
									admins: {
										some : {
											id : userid
										}
									}
								}
							],
							AND: [
								{
									OR: [
										{
											members: {
												some : {
													id: channel.member_id
												}
											},
										},
										{
											admins: {
												some: {
													id : channel.member_id
												}
											}
										}
									]
								}
							]
						}
					]
				}
			})
			if (!room || ( await this.is_admin(userid,channel.channel_id) && await this.is_owner(channel.member_id,channel.channel_id) )) 
				return false;
			if (await this.is_admin(userid,channel.channel_id) && await this.is_admin(channel.member_id,channel.channel_id))
				return false;
			const kick_member = await this.prisma.room.update({
				where: {
					id : channel.channel_id
				},
				data: {
					members : {
						disconnect: {
							id : channel.member_id
						}
					},
					admins: {
						disconnect: {
							id : channel.member_id
						}
					},
					muted: {
						disconnect: {
							id : channel.member_id
						}
					}
				}
			})
		} catch (error) {
			return false;
		}
		return true;
	}

	async ban_member(userid: string, channel : add_admin)
	{
		try {
			const room = await this.prisma.room.findUnique({
				where: {
					id : channel.channel_id,
					AND: [
						{
							OR: [
								{
									ownerId : userid
								},
								{
									admins: {
										some : {
											id : userid
										}
									}
								}
							],
							AND: [
								{
									OR: [
										{
											members: {
												some : {
													id: channel.member_id
												}
											},
										},
										{
											admins: {
												some: {
													id : channel.member_id
												}
											}
										}
									]
								}
							]
						}
					]
				}
			})
			if (!room || ( await this.is_admin(userid,channel.channel_id) && await this.is_owner(channel.member_id,channel.channel_id) )) 
				return false;
			if (await this.is_admin(userid,channel.channel_id) && await this.is_admin(channel.member_id,channel.channel_id))
				return false;
			const ban_member = await this.prisma.room.update({
				where: {
					id : channel.channel_id
				},
				data: {
					members : {
						disconnect: {
							id : channel.member_id
						}
					},
					admins: {
						disconnect: {
							id : channel.member_id
						}
					},
					muted: {
						disconnect: {
							id  : channel.member_id
						}
					},
					banned: {
						connect: {
							id : channel.member_id
						}
					}
				}
			})
		} catch (error) {
			return false;
		}
		return true;
	}
}
