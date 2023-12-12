import { Controller, Get, Param, Session } from "@nestjs/common";
import { chatService } from "./chat.service";
import { Record } from "@prisma/client/runtime/library";

@Controller('chat')
export class ChatController{
	constructor(private chatService: chatService){}


	// get message history  of direct messages
	@Get('history/:id')
	async history(@Session() session: Record<string,any>,@Param('id') id : string)
	{
		//console.log(session.passport.user.id);
		//console.log(id);
		let all_messages : message_history[]  = await this.chatService.get_all_dm_history(session.passport.user.id,id);
		return all_messages;
	}

	// get all conv with friends 
	@Get('conv')
	async conv(@Session() session: Record<string,any>)
	{
		return this.chatService.get_all_conv(session.passport.user.id);
	}

	// block a friend
	@Get('block/:id')
	async block(@Session() session : Record<string,any>,@Param('id') id: string)
	{
	}
}
