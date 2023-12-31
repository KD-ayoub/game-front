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
		//console.log('lol ', client.id);
	}


	// send a message in direct messages
	@SubscribeMessage("dm")
	async send_message(@MessageBody() body: Direct_message, @ConnectedSocket() client : Socket)
	{
		//console.log(receiver_pic_name);
		let sender_obj : message_history = {
			mine: true,
			sended_at: body.content.sended_at,
			content: body.content.message_content,
			name: "you",
			picture: "default"
		};

		let receiver_obj : message_history = {
			mine: false,
			sended_at: body.content.sended_at,
			content: body.content.message_content,
			name: "you",
			picture: "default"
		};

		if (!body || !body.content || !body.recieverId || !body.content.message_content || !body.content.sended_at)
			return ;
		this.logger.log(body.content.message_content);

		// get id of user by socket id
		const user : string = this.appGateway.get_id_by_socketId(client.id)

		// get pic and name of the sender
		const sender_pic_name = await this.chatService.get_picture_name(user);
		sender_obj.picture = sender_pic_name.profile.photo_path;
		receiver_obj.picture = sender_pic_name.profile.photo_path;
		receiver_obj.name = sender_pic_name.nickName;
		const recieversocket_id = this.appGateway.get_socketID_by_id(body.recieverId);



		await this.chatService.create_a_direct_message(user,body,recieversocket_id,client.id);
		// get socket id of the reciever

		// if no socket found don't emit
		this.appGateway.server.to(recieversocket_id).emit('chat',receiver_obj);
		this.appGateway.server.to(client.id).emit('chat',sender_obj);

		// if the message is the first message in the converstation emit to conversation list
	}

	// join to the socket room
	@SubscribeMessage('join')
    async handleJoinChannel(client: Socket,  data: any) {

		if (await this.chatService.check_if_user_in_channel(this.appGateway.get_id_by_socketId(client.id),data.channel))
			client.join(data.channel);
    }

	// data.channel 
	// data.sender
	// data.content
	// data.photo
	// data.time
	@SubscribeMessage('send_room')
	sendchannel(client: Socket, data: any)
	{
		// check if user is in the channel
		// then check if the user is muted
		
		console.log("send room : ", data);
		this.appGateway.server.to(data.channel).emit("blan", "1");
	}
}
