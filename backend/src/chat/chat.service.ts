import { Injectable } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class chatService {
	constructor(private prisma : PrismaService){}

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


	async create_a_direct_message(senderId: string,content : Direct_message)
	{
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
			console.log("hey")
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

	async get_all_conv(id: string)
	{
		const conv = await this.prisma.directMessage.findMany({
			where: {
				OR:[
					{
						sender: {
							id
						}
					},
					{
						receiver : {
							id
						},
					}
				]
			},
			select:{
				content: true
			}
			//select:{
			//	receiver:{
			//		select:{
			//			nickName : true
			//		}
			//	},
			//	sender:{
			//		select:{
			//			nickName : true
			//		}
			//	}
			//}
		})
		//console.log(conv);
		return conv;
	}

}
