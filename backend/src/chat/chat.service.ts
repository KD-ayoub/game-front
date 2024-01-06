import { BadRequestException, HttpException, HttpStatus, Injectable, Param } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { Room, RoomMessage, RoomType } from "@prisma/client";
import { errorMonitor } from "events";
import { PrismaService } from "prisma/prisma.service";
import { AppGateway } from "src/app.gateway";
import { add_admin, channels, create_channel, join_protected_channel } from "src/utils/types";
import * as bcrypt from  'bcrypt'
import { CloudinaryService } from "src/cloudinary/cloudinary.service";

@Injectable()
export class chatService {
	constructor(private prisma : PrismaService,private appGateway : AppGateway, private cloudinaryService: CloudinaryService){}

	async get_picture_name(id: string)
	{
		//while(1);
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
					OR :[
						{
							userId : senderId,
							friendId : content.recieverId,
							is_blocked: true

						},
						{
							userId : content.recieverId,
							friendId : senderId,
							is_blocked: true
						}

					],
				}
			});
			if (friendship)
				return false;
			const dm = await this.prisma.directMessage.create({
				data: {
					content : content.message,
					senderId,
					receiverId : content.recieverId,
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
				},
				is_blocked: true
			}
		})
		const reshapedResult = friends.map(user => {
				return {id : user.friend.id,nickname: user.friend.nickName, photo: user.friend.profile.photo_path, isBlocked: user.is_blocked}
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


	async upload_channel_img(file: Express.Multer.File,id : string,userid: string)
	{
			try {
      			const upload = await this.cloudinaryService.uploadFile(file);
				const room = await this.prisma.room.update({
					where: {
						id,
						ownerId: userid
					},
					data: {
						photo: upload.url
					}
				})
				if (!room)
					return false;
			} catch (error) {
					return false;
			}
			return true;
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
		return await bcrypt.hash(pass,10);
	}

	async compare_password(pass:string, hash: string)
	{
		return await bcrypt.compare(pass,hash);
	}

	async create_channel_obj(channel: Room,userid : string): Promise<channels>
	{
		let b : channels = {id : "", isJoined: false, nameOfChannel : "", type: "" , photo: "https://cdn.intra.42.fr/users/a8bb89f49d75ccc6a0c1da0dcbf3f109/akouame.jpg"};

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
				b.isJoined = true;
				b.nameOfChannel = private_room.name;
				b.type = private_room.type;
				b.photo = private_room.photo;
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
					},
					photo: true

				}
			});
			if (rooms)
			{
				b.id = rooms.id;
				b.nameOfChannel = rooms.name;
				b.type = rooms.type;
				b.photo = rooms.photo;
				if (rooms.owner.id == userid)
				{
					b.isJoined = true;
					return b;
				}
				for (let i = 0; i < rooms.members.length; i++)
				{
					if (rooms.members[i].id == userid)
					{
						b.isJoined = true;
						return b;
					}
				}
				for (let i = 0; i < rooms.admins.length; i++)
				{
					if (rooms.admins[i].id == userid)
					{
						b.isJoined = true;
						return b;
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
		this.appGateway.server.emit('members_refresh','refresh');
		return true;
	}

	async join_protected(channel : join_protected_channel, userid: string)
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
				this.appGateway.server.emit('members_refresh','refresh');
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
					ownerId: userid,
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
		this.appGateway.server.emit('members_refresh','refresh');
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
			this.appGateway.server.emit('members_refresh','refresh');
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
			await this.prisma.room.update({
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

			setTimeout(async () => {

				await this.prisma.room.update({
					where: {
						id : channel.channel_id
					},
					data: {
						muted: {
							disconnect: {
								id : channel.member_id
							}
						}
					}
				})
			}, 1000 * 60);
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
		// i need to send a different event to refresh and to set the selected channel id to nothing
		this.appGateway.server.emit('members_refresh','refresh');
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
		// i need to send a different event to refresh and to set the selected channel id to nothing
		this.appGateway.server.emit('members_refresh','refresh');
		return true;
	}

	async create_room_msg(senderid: string,data: channel_msg) : Promise<room_msg>
	{
		let obj : room_msg = {
			senderid: "",
			content: "",
			time: new Date(),
			photo: "",
			mine: false,
			name: ""
		}

		try {
			const new_msg = await this.prisma.roomMessage.create({
				data: {
					sender: {
						connect  : {
							id : senderid
						}
					},
					room: {
						connect : {
							id : data.channel_id
						}
					},
					content: data.content,
				},
				select: {
					createdAt: true
				}
			})
			if (new_msg)
			{
				const picture = await this.get_picture_name(senderid);

				obj.content = data.content;
				obj.photo = picture.profile.photo_path;
				obj.senderid = senderid;
				obj.time = new_msg.createdAt;
				obj.name = picture.nickName;
			}
			return obj;
		} catch (error) {
			return obj;	
		}
	}

	async leave(userid: string, channel : leave_channel)
	{
		try {
			if (await this.is_admin(userid,channel.channel) || await this.is_member(userid,channel.channel))
			{
				try {
					const room = await this.prisma.room.update({
						where: {
							id : channel.channel
						},
						data: {
							members: {
								disconnect: {
									id : userid
								}
							},
							admins: {
								disconnect: {
									id : userid
								}
							}
						}
					})
					if (!room)
						return false;
					const sockets = await this.appGateway.server.in(this.appGateway.get_socketID_by_id(userid)).fetchSockets();
					const socket = sockets.find(socket => socket.id.toString() === this.appGateway.get_socketID_by_id(userid));
					socket.leave(channel.channel);
					this.appGateway.server.emit('members_refresh','refresh');
					return true;
				} catch (error) {
					return false;
				}
			}
			else if (await this.is_owner(userid,channel.channel))
			{
				try {
					const roomMessages = await this.prisma.roomMessage.deleteMany({
						where: {
							roomId: channel.channel
						}
					})
					const room = await this.prisma.room.delete({
						where: {
							id : channel.channel
						}
					})
					if (!room)
						return false;
					this.appGateway.server.socketsLeave(channel.channel);

					// i need to send a different event to refresh and to set the selected channel id to nothing
					this.appGateway.server.emit('members_refresh','refresh');
					return true;
				} catch (error) {
					return false;
				}
			}

		} catch (error) {
			return false;
		}
		return false;
	}


	async room_messages(userid: string,channel_id : string)
	{
		let messagehistory :room_msg_history [] = [];
		try {
			const friends = await this.prisma.friendship.findMany({
				where: {
					userId: userid,
					is_blocked: true
				},
				select: {
					friendId: true
				}
			})
			const messages = await this.prisma.roomMessage.findMany({
				where: {
					roomId : channel_id,
					// check if the user is in the room
				},
				orderBy: {
					createdAt: 'asc'
				},
				select: {
					createdAt: true,
					content: true,
					sender: {
						select: {
							nickName: true,
							id: true,
							profile: {
								select: {
									photo_path: true
								}
							}
						}
					}
				}
			})
			messages.forEach( (message) => {
				if (friends.length == 0)
				{
					let node : room_msg_history = {content : "", mine : false , photo : "", name : "" , time: new Date(),sender_id : ""};
					node.photo = message.sender.profile.photo_path;
					node.name = message.sender.nickName;
					node.content = message.content;
					node.time = message.createdAt;
					node.sender_id = message.sender.id;
					if (message.sender.id == userid)
					{
						node.mine = true;
						node.name = "you";
					}
					messagehistory.push(node);
				}
				friends.forEach((friend) => {
					if (friend.friendId != message.sender.id)
					{
						let node : room_msg_history = {content : "", mine : false , photo : "", name : "" , time: new Date(),sender_id : ""};
						node.photo = message.sender.profile.photo_path;
						node.name = message.sender.nickName;
						node.content = message.content;
						node.time = message.createdAt;
						node.sender_id = message.sender.id;
						if (message.sender.id == userid)
						{
							node.mine = true;
							node.name = "you";
						}
						messagehistory.push(node);
					}
				})

			});
			return messagehistory;		
		} catch (error) {
			return messagehistory;
		}
		return messagehistory;
	}


	async members(userid: string,channel_id : string)
	{
		let list_members : member[] = [];
		try {
			const members = await this.prisma.room.findUnique({
				where: {
					id : channel_id
					// check if the user is in the room
				},
				select: {
					owner:{
						select: {
							id: true,
							nickName: true,
							profile: {
								select: {
									photo_path: true,
								}
							}
						}
					},
					members: {
						select: {
							id : true,
							nickName: true,
							profile: {
								select: {
									photo_path: true,
								}
							}
						}
					},
					admins: {
						select: {
							id : true,
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
			if (!members)
				return list_members;
			if (members.owner)
			{
				let node : member = {id: members.owner.id,nickname: members.owner.nickName, photo: members.owner.profile.photo_path, role: "owner"};
				list_members.push(node);
			}
			members.admins.forEach((admin) => {
				let node : member = {id: admin.id ,nickname: admin.nickName, photo: admin.profile.photo_path, role: "admin"};
				list_members.push(node);
			});
			members.members.forEach((member) => {
				let node : member = {id: member.id ,nickname: member.nickName, photo: member.profile.photo_path, role: "member"};
				list_members.push(node);
			});
		} catch (error) {
			return list_members;
		}
		return list_members;
	}

	async friends_states(userid: string)
	{
		const list = [];
		try {
			const friends = await this.prisma.friendship.findMany({
				where: {
					userId: userid,
					NOT: [
						{
							friend: {
								is_active: "offline"
							}
						}
					]
				},
				select: {
					friend: {
						select: {
							profile: {
								select: {
									photo_path: true
								}
							},
							nickName: true,
							is_active: true,
							id: true
						}
					}
				}
			})
			friends.forEach((friend) => {
				const b = { id: "" , photo_path: "", is_active: "", nickName: ""};
				b.id = friend.friend.id;
				b.nickName = friend.friend.nickName;
				b.is_active = friend.friend.is_active;
				b.photo_path = friend.friend.profile.photo_path;
				list.push(b);
			})
			return list;
		} catch (error) {
			return list;
		}
	}


	async get_all_blocked_friends(userid: string)
	{
		const blocked = [];
		try {
			const friends = await this.prisma.friendship.findMany({
				where: {
					friendId: userid,
					is_blocked: true
				},
				select: {
					user: {
						select: {
							id: true
						}
					}
				}

			})
			friends.forEach((friend) => {
				let id = this.appGateway.get_socketID_by_id(friend.user.id);
				blocked.push(id);
			})
			return blocked;
		} catch (error) {
			return blocked;
		}
	}
}
