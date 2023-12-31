import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, Param, Post, Session } from "@nestjs/common";
import { chatService } from "./chat.service";
import { Record } from "@prisma/client/runtime/library";
import { create_channel, join_private_channel } from "src/utils/types";
import { RoomType } from "@prisma/client";
import { session } from "passport";

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

	// unblock friend
	@Get('unblock/:id')
	async unblock(@Session() session : Record<string,any>,@Param('id') id: string)
	{
		const value = await this.chatService.unblock_a_friend(session.passport.user.id,id);
		if (!value)
			throw new HttpException('bad',HttpStatus.BAD_REQUEST);
		else
			throw new HttpException('good',HttpStatus.OK);

	}

	// create_channel
	@Post('create_channel')
	async create_channel(@Body() body: create_channel,@Session() session : Record<string,any>)
	{
		if (!body.name || !body.type || !body.photo) 
			throw new HttpException('bad',HttpStatus.BAD_REQUEST);
		if  (body.type == RoomType.PROTECTED && !body.password)
			throw new HttpException('password not found',HttpStatus.NOT_FOUND)
		if ((await this.chatService.create_channel(body,session.passport.user.id)) == false)
		{
			throw new HttpException("name is already taken",HttpStatus.CONFLICT);
		}

	}

	// get all channels
	@Get("list_channels")
	async list_channels(@Session() session : Record<string,any>)
	{
		const userid = session.passport.user.id;
		return await this.chatService.list_all_channels(userid);
	}

	// join public channel
	@Get('join_public/:id')
	async join_public(@Session() session: Record<string,any>,@Param('id') channel_id : string)
	{
		const b = await this.chatService.join_public(session.passport.user.id,channel_id);
		if (b === false)
			throw new HttpException("can't join the channel", HttpStatus.CONFLICT);
		throw new HttpException("member added",HttpStatus.OK);
	}

	// join protected channels
	@Post('join_protected')
	async join_protected(@Body() body: join_private_channel, @Session() session :Record<string,any>)
	{
		if (!body.id || !body.password)
			throw new HttpException("request is not valid", HttpStatus.BAD_REQUEST);
		const result = await this.chatService.join_protected(body,session.passport.user.id);
		if (result === 3)
			throw new HttpException("member added",HttpStatus.OK);
		else if (result === 2)
			throw new HttpException("can't join the channel", HttpStatus.CONFLICT);
		else if (result === 1)
			throw new HttpException("wrong password",HttpStatus.NOT_ACCEPTABLE);
	}



	// add admin
	@Get('add_admin')
	async add_admin()
	{
	}

	// invite friend to channel
	@Get('add_members')
	async add_members()
	{
	}


	// mute a member in the channel
	@Get('mute')
	async mute()
	{
	}

	// kick a member 
	@Get('kick')
	async kick()
	{
	}

	// ban a member
	@Get('ban')
	async ban()
	{
	}
	
	// remove and change password from a channel



	// list all messages in a channel
}
