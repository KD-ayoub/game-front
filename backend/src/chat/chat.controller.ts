import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, Param, Post, Session } from "@nestjs/common";
import { chatService } from "./chat.service";
import { Record } from "@prisma/client/runtime/library";
import { create_channel } from "src/utils/types";
import { RoomType } from "@prisma/client";

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
		return this.chatService.get_all_friends(session.passport.user.id);
	}

	// block a friend
	@Get('block/:id')
	async block(@Session() session : Record<string,any>,@Param('id') id: string)
	{
		const value = await this.chatService.block_a_friend(session.passport.user.id,id);
		if (!value)
			throw new HttpException('bad',HttpStatus.BAD_REQUEST);
		else
			throw new HttpException('good',HttpStatus.OK);

	}

	@Get('unblock/:id')
	async unblock(@Session() session : Record<string,any>,@Param('id') id: string)
	{
		const value = await this.chatService.unblock_a_friend(session.passport.user.id,id);
		if (!value)
			throw new HttpException('bad',HttpStatus.BAD_REQUEST);
		else
			throw new HttpException('good',HttpStatus.OK);

	}

	@Post('create_channel')
	async create_channel(@Body() body: create_channel,@Session() session : Record<string,any>)
	{
		if (!body.name || !body.permission|| !body.photo) 
			throw new HttpException('bad',HttpStatus.BAD_REQUEST);
		if  (body.permission == RoomType.PROTECTED && !body.password)
			throw new HttpException('password not found',HttpStatus.NOT_FOUND)
		if ((await this.chatService.create_channel(body,session.passport.user.id)) == false)
		{
			throw new HttpException("name is already taken",HttpStatus.CONFLICT);
		}

	}

	@Get("list_channels")
	async list_channels(@Session() session : Record<string,any>)
	{
		
		const userid = session.passport.user.id;
		return await this.chatService.list_all_channels(userid);
	}
}
