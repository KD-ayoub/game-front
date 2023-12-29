import { BadRequestException, Injectable } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { Room, RoomType } from "@prisma/client";
import { errorMonitor } from "events";
import { PrismaService } from "prisma/prisma.service";
import { AppGateway } from "src/app.gateway";
import { channels, create_channel } from "src/utils/types";
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
			const directMessage  = await this.prisma.directMessage.findFirst({
				where: {
					OR: [
						{
							senderId,
						},
						{
							receiverId: senderId,
						}
					]
				}
			})
			if (!directMessage)
			{
				const sender_obj = await this.get_picture_name(senderId);
				this.appGateway.server.to(rec_sock_id).emit('conv',sender_obj);
				//console.log("sender : " , sender_obj);
				const receiver_obj = await this.get_picture_name(content.recieverId);
				this.appGateway.server.to(send_sock_id).emit('conv',receiver_obj);

				//console.log("receiver : " , receiver_obj);


				//console.log("-------------------->   ",content);
				// emit a new conversation 
			}
		} catch (error) {
			console.log("error adak lhmar");
		}
		try {
			await this.prisma.directMessage.create({
				data: {
					content : content.content.message_content,
					senderId,
					receiverId : content.recieverId,
					createdAt: content.content.sended_at,
				}
			});
			
		} catch (error) {
			console.log("hey : ",error)
			 throw new WsException('invalid credentials.');
		}
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
					type: obj.permission,
					ownerId: userid,
				},
				select: {
					id: true,
				}
			})
			if (obj.permission == RoomType.PROTECTED)
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
		console.log(pass)
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
			console.log(node);
		}
		return result;
	}
}
