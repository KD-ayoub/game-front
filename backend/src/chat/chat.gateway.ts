import { Injectable } from "@nestjs/common";
import { Logger } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { AppGateway } from "src/app.gateway";
import { chatService } from "./chat.service";

// create a room  -> private or public or protected
// join room -> private or public or protected or banned
// send direct message -> blocked
@Injectable()
@WebSocketGateway({
  transports: ['websocket'],
  cors: {
    origin: '*',
  },
	//namespace: '/',
})
export class chatGateway implements OnGatewayConnection 
{
	constructor(private appGateway : AppGateway,private chatService: chatService){
	}

	private logger = new Logger('ChatGateway');
	handleConnection(client: Socket, ...args: any[]) {
		console.log("salina");
	}


	// send a message in direct messages
	@SubscribeMessage("dm")
	async send_message(@MessageBody() body: Direct_message, @ConnectedSocket() client : Socket)
	{
		//console.log(receiver_pic_name);

		let sender_obj : message_history = {
			mine: true,
			sended_at: new Date(),
			content: body.message,
			name: "you",
			picture: "default"
		};

		let receiver_obj : message_history = {
			mine: false,
			sended_at: new Date(),
			content: body.message,
			name: "you",
			picture: "default"
		};
		//console.log(!body,!body.content,!body.recieverId,!body.content.message_content,!body.content.sended_at);
		if (!body  || !body.recieverId || !body.message)
			return ;

		//this.logger.log(body.message);

		// get id of user by socket id
		const user : string = this.appGateway.get_id_by_socketId(client.id)

		// get pic and name of the sender
		if (!user)
		{
			console.log(client.rooms);
			//while(1);
			return ;
		}

		const sender_pic_name = await this.chatService.get_picture_name(user);
		sender_obj.picture = sender_pic_name.profile.photo_path;
		receiver_obj.picture = sender_pic_name.profile.photo_path;
		receiver_obj.name = sender_pic_name.nickName;
		const recieversocket_id = this.appGateway.get_socketID_by_id(body.recieverId);

		if ( !( await this.chatService.create_a_direct_message(user,body,recieversocket_id,client.id) ) )
			return false;

		console.log("hahouwa ja")
		console.log("zbi");
		// get all connected sockets and userid
		// this.appGateway.print();
		// get socket id of the reciever

		// if no socket found don't emit
		this.appGateway.server.to(recieversocket_id).emit('chat',receiver_obj);
		this.appGateway.server.to(client.id).emit('chat',sender_obj);

		// if the message is the first message in the converstation emit to conversation list
	}

	// join to the socket room
	@SubscribeMessage('join')
    async handleJoinChannel(client: Socket,  data: join_channel) {
		if (await this.chatService.check_if_user_in_channel(this.appGateway.get_id_by_socketId(client.id),data.channel_id))
		{
			client.join(data.channel_id);
		}

		
    }


	@SubscribeMessage('room')
	async sendchannel(client: Socket, data: channel_msg)
	{
		console.log(data);
		if (!data.channel_id || !data.content)
			return ;
		if (client.rooms.has(data.channel_id))
		{
			if ((await this.chatService.is_muted(this.appGateway.get_id_by_socketId(client.id), data.channel_id)))
			{
				const mssg : room_msg  = await this.chatService.create_room_msg(this.appGateway.get_id_by_socketId(client.id),data);
				const client_msg: room_msg = {...mssg};
				client_msg.mine = true;
				if (mssg.content)
				{
					let blocked = await this.chatService.get_all_blocked_friends(this.appGateway.get_id_by_socketId(client.id));
					blocked.push(client.id);

					this.appGateway.server.to(data.channel_id).except(blocked).emit(data.channel_id, mssg);
					this.appGateway.server.to(client.id).emit(data.channel_id, client_msg);
				}
			}

		}
	}
}
