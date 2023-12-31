import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, Param, Post, Session, UseGuards } from "@nestjs/common";
import { chatService } from "./chat.service";
import { Record } from "@prisma/client/runtime/library";
import { add_admin, create_channel, join_private_channel } from "src/utils/types";
import { RoomType } from "@prisma/client";
import { session } from "passport";
import { AuthenticatedGuard} from "src/auth/guards";



@Controller('chat')
export class ChatController{
	constructor(private chatService: chatService){}

	//////////////////////// direct messages endpoints ////////////////////////////////
	

	// get message history  of direct messages
	@UseGuards(AuthenticatedGuard)
	@Get('history/:id')
	async history(@Session() session: Record<string,any>,@Param('id') id : string)
	{
		//console.log(session.passport.user.id);
		//console.log(id);
		let all_messages : message_history[]  = await this.chatService.get_all_dm_history(session.passport.user.id,id);
		return all_messages;
	}

	// get all conv with friends 
	@UseGuards(AuthenticatedGuard)
	@Get('conv')
	async conv(@Session() session: Record<string,any>)
	{
		return this.chatService.get_all_friends(session.passport.user.id);
	}

	// block a friend
	@UseGuards(AuthenticatedGuard)
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
	@UseGuards(AuthenticatedGuard)
	@Get('unblock/:id')
	async unblock(@Session() session : Record<string,any>,@Param('id') id: string)
	{
		const value = await this.chatService.unblock_a_friend(session.passport.user.id,id);
		if (!value)
			throw new HttpException('bad',HttpStatus.BAD_REQUEST);
		else
			throw new HttpException('good',HttpStatus.OK);

	}








	////////////////////////////// channels endpoints //////////////////////////////////////



	// create_channel
	@UseGuards(AuthenticatedGuard)
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
	@UseGuards(AuthenticatedGuard)
	@Get("list_channels")
	async list_channels(@Session() session : Record<string,any>)
	{
		const userid = session.passport.user.id;
		return await this.chatService.list_all_channels(userid);
	}

	// join public channel
	@UseGuards(AuthenticatedGuard)
	@Get('join_public/:id')
	async join_public(@Session() session: Record<string,any>,@Param('id') channel_id : string)
	{
		const b = await this.chatService.join_public(session.passport.user.id,channel_id);
		if (b === false)
			throw new HttpException("can't join the channel", HttpStatus.CONFLICT);
		throw new HttpException("member added",HttpStatus.OK);
	}

	// join protected channels
	@UseGuards(AuthenticatedGuard)
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
	@UseGuards(AuthenticatedGuard)
	@Post('add_admin')
	async add_admin(@Session() session: Record<string,any>,@Body() body: add_admin)
	{
		// check if is member then make him admin and delete the user from member
		if (!body.member_id || !body.channel_id)
			throw new HttpException("invalid request", HttpStatus.BAD_REQUEST);
		const result = await this.chatService.add_admin(session.passport.user.id,body);
		if (result === 1)
			throw new HttpException("can't make the user an admin",HttpStatus.FORBIDDEN);
		if (result === 2)
			throw new HttpException("user is not admin or the channel doesn't exist",HttpStatus.NOT_FOUND);
		throw new HttpException("done",HttpStatus.OK);
	}

	// invite friend to channel
	@UseGuards(AuthenticatedGuard)
	@Get('add_members')
	async add_members()
	{
		// add a friend to be a member
	}


	// mute a member in the channel
	@Get('mute')
	@UseGuards(AuthenticatedGuard)
	async mute()
	{
		// check the previlege then check the other user user previlege if everything is okey then mute
	}

	// kick a member 
	@Get('kick')
	@UseGuards(AuthenticatedGuard)
	async kick()
	{
		// check the previlege then check the other user user previlege if everything is okey then kick
	}

	// ban a member
	@Get('ban')
	@UseGuards(AuthenticatedGuard)
	async ban()
	{
		// check the previlege then check the other user user previlege if everything is okey then ban
	}

	// remove and change password from a channel



	// list all messages in a channel


	//  list all channel members and admins and owner
}
