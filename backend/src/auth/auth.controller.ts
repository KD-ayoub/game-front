import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthenticatedGuard, FT_GUARD, first_timeGuard } from './guards';
import { AuthService } from './auth.service';
import { intra_api_info, signup, user_request } from 'src/utils/types';
import { request } from 'http';

@Controller('auth')
export class AuthController {
	constructor(private auth: AuthService){}

	// first path to log to intra  it redirect to 42 api
	@Get('/login')
	@UseGuards(FT_GUARD)
	login() {
	  return;
	}


	// 42 api redirect to this page and this page send a cookie
	@Get('/redirect')
	@UseGuards(FT_GUARD)
	redirect(@Req() req: Request) {
		// return here if first time
		
		return req.user;
	}


	// this route get user info for the first time	
	@Post('/signup')
	@UseGuards(AuthenticatedGuard)
	signup(@Req() req: Request,@Body() body: signup) {
	  return this.auth.signup(req.user,body);
	}
	
	
	// guards after checking 42 login and then check if first time and then check for 2fa
	@Get('/status')
	@UseGuards(first_timeGuard)
	status(@Req() req: Request) {
	  return req.user;
	}
	
	@Get('/logout')
	@UseGuards(first_timeGuard)
	logout(@Req() req: Request) {
	  return req.user;
	}

	@Get("/test")
	@UseGuards(first_timeGuard)
	test()
	{
		return "test";
	}
}
