import { Injectable } from "@nestjs/common";
import { Logger } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { AppGateway } from "src/app.gateway";
import { chatService } from "./chat.service";
// create a room  -> private or public or protected
// join room -> private or public or protected or banned
// send direct message -> blocked

@Injectable()
@WebSocketGateway()
export class chatGateway 
{
	constructor(private appGateway : AppGateway,private chatService: chatService){
	}

	private logger = new Logger('ChatGateway');


	// send a message in direct messages
	@SubscribeMessage("dm")
	async send_message(@MessageBody() body: Direct_message, @ConnectedSocket() client : Socket)
	{
		if (!body)
			return ;
		this.logger.log(body.content.message_content);

		// get id of user by socket id
		const user : string = this.appGateway.get_id_by_socketId(client.id)

		await this.chatService.create_a_direct_message(user,body);

		// get socket id of the reciever
		const recieversocket_id = this.appGateway.get_socketID_by_id(body.recieverId);

		// if no socket found don't emit
		this.appGateway.server.to(recieversocket_id).emit('chat',body);
	}
}
