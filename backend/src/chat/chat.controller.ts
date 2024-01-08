import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, Param, Post, Session, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { chatService } from "./chat.service";
import { Record } from "@prisma/client/runtime/library";
import { add_admin, create_channel, join_protected_channel } from "src/utils/types";
import { RoomType } from "@prisma/client";
import { session } from "passport";
import { AuthenticatedGuard} from "src/auth/guards";
import { FileInterceptor } from "@nestjs/platform-express";



@Controller('chat')
export class ChatController{
	constructor(private chatService: chatService){}

	//////////////////////// direct messages endpoints ////////////////////////////////
	

	// get message history  of direct messages
	@UseGuards(AuthenticatedGuard)
	@Get('history/:id')
	async history(@Session() session: Record<string,any>,@Param('id') id : string)
	{
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


	// delete friendship

	// add friendship








	////////////////////////////// channels endpoints //////////////////////////////////////
	@UseGuards(AuthenticatedGuard)
  	@UseInterceptors(FileInterceptor('file'))
	@Post('channel_photo/:name')
	async channel_photo(@UploadedFile() file: Express.Multer.File,@Param('name') name: string,@Session() session: Record<string,any>)
	{
		if (!(await this.chatService.upload_channel_img(file,name,session.passport.user.id)))
			throw new HttpException("id is not right or you don't have permission",HttpStatus.FORBIDDEN);
	}



	// create_channel
	@UseGuards(AuthenticatedGuard)
	@Post('create_channel')
	async create_channel(@Body() body: create_channel,@Session() session : Record<string,any>)
	{
		if (!body.name || !body.type) 
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
	async join_protected(@Body() body: join_protected_channel, @Session() session :Record<string,any>)
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
	@Post('add_member')
	async add_members(@Session() session: Record<string,any>,@Body() body: add_admin)
	{
		if ( !(await this.chatService.add_member(session.passport.user.id,body)))
			throw new HttpException("can't add a member", HttpStatus.CONFLICT);
		throw new HttpException("ok",HttpStatus.OK);
		// add a friend to be a member
	}


	// mute a member in the channel
	@UseGuards(AuthenticatedGuard)
	@Post('mute')
	async mute(@Session() session: Record<string,any>,@Body() body: add_admin)
	{
		// check the previlege then check the other user user previlege if everything is okey then mute
		if (await this.chatService.mute_member(session.passport.user.id,body))
			throw new HttpException("ok",HttpStatus.OK);
		throw new HttpException("can't mute the member", HttpStatus.FORBIDDEN);
	}

	// kick a member 
	@UseGuards(AuthenticatedGuard)
	@Post('kick')
	async kick(@Session() session: Record<string,any>,@Body() body: add_admin)
	{
		// check the previlege then check the other user user previlege if everything is okey then kick
		if (await this.chatService.kick_member(session.passport.user.id,body))
			throw new HttpException("ok",HttpStatus.OK);
		throw new HttpException("can't kick the member", HttpStatus.FORBIDDEN);
	}

	// ban a member
	@UseGuards(AuthenticatedGuard)
	@Post('ban')
	async ban(@Session() session: Record<string,any>,@Body() body: add_admin)
	{
		// check the previlege then check the other user user previlege if everything is okey then ban
		if (await this.chatService.ban_member(session.passport.user.id,body))
			throw new HttpException("ok",HttpStatus.OK);
		throw new HttpException("can't ban the member", HttpStatus.FORBIDDEN);
	}

	// leave channel
	@UseGuards(AuthenticatedGuard)
	@Post('leave')
	async leave(@Session() session: Record<string,any>,@Body() body:  leave_channel)
	{
		if (await this.chatService.leave(session.passport.user.id,body))
			throw new HttpException("ok",HttpStatus.OK);
		throw new HttpException("can't leave the channel",HttpStatus.FORBIDDEN);
	}


	// user role
	@UseGuards(AuthenticatedGuard)
	@Get('role/:id')
	async user_role(@Session() session: Record<string,any>,@Param('id') channel_id : string)
	{
		if (await this.chatService.is_admin(session.passport.user.id,channel_id))
			return {"role": "admin" , "nickname" : session.passport.user.nickName, "id" : session.passport.user.id};
		else if (await this.chatService.is_member(session.passport.user.id,channel_id))
			return {"role" : "member", "nickname" : session.passport.user.nickName, "id" : session.passport.user.id}
		else if (await this.chatService.is_owner(session.passport.user.id,channel_id))
			return {"role" : "owner", "nickname" : session.passport.user.nickName, "id" : session.passport.user.id};
		throw new HttpException("NOT in the channel",HttpStatus.FORBIDDEN);
	}





	//  list all channel members and admins and owner
	@UseGuards(AuthenticatedGuard)
	@Get('members/:id')
	async members(@Session() session: Record<string,any>,@Param('id') channel_id : string)
	{
		return this.chatService.members(session.passport.user.id,channel_id);
	}
	
	// list all messages in a channel
	@UseGuards(AuthenticatedGuard)
	@Get('list_room_messsages/:id')
	async room_messages(@Session() session: Record<string,any>,@Param('id') channel_id : string)
	{
		return await this.chatService.room_messages(session.passport.user.id,channel_id);
	}

	@UseGuards(AuthenticatedGuard)
	@Get('friends_state')
	async friends_states(@Session() session: Record<string, any>)
	{
		return await this.chatService.friends_states(session.passport.user.id);
	}


	@UseGuards(AuthenticatedGuard)
	@Post('channel_password')
	async channel_password(@Session() session: Record<string,any>,@Body() data : update_password)
	{
		if (!data.channel_id || !data.password || !data.type)
			throw new HttpException("error",HttpStatus.FORBIDDEN);
		if (await this.chatService.channel_password(data))
			throw new HttpException("error",HttpStatus.FORBIDDEN);
	}
	// remove and change password from a channel

}
