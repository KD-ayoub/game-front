import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { errorMonitor } from "events";
import { PrismaService } from "prisma/prisma.service";
import { AppGateway } from "src/app.gateway";

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

	/*async get_all_conv(id: string)
	{
		const conversations = await this.prisma.directMessage.findMany({
    		where: {
    		  OR: [
    		    {
    		      sender: {
    		        id,
    		      },
    		    },
    		    {
    		      receiver: {
    		        id,
    		      },
    		    },
    		  ],
    		},
    		select: {
    		  sender: {
    		    select: {
    		      id: true,
    		      nickName: true,
    		    },
    		  },
    		  receiver: {
    		    select: {
    		      id: true,
    		      nickName: true,
    		    },
    		  },
    		},
		});

		const uniqueUserIds = Array.from(
			new Set([
				...conversations.map((conv) => conv.sender.id),
      			...conversations.map((conv) => conv.receiver.id),
			])
		);
		const conv = uniqueUserIds.filter((userid) => userid !== id);

		const users = await this.prisma.user.findMany({
			where:{
				id: {in: conv}
			},
			select:{
				nickName: true,
				profile:{
					select: {
						photo_path: true,
					}
				}
			}
		})
		return users;
	}*/
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
}
