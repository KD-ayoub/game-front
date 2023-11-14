import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthenticatedGuard, FT_GUARD } from './guards';
import { AuthService } from './auth.service';
import { intra_api_info, signup, user_request } from 'src/utils/types';

interface User extends user_request{

}

@Controller('auth')
export class AuthController {
	constructor(private auth: AuthService){}

	@Get('42/login')
	@UseGuards(FT_GUARD)
	login() {
	  return;
	}

	@Post('42/signup')
	@UseGuards(AuthenticatedGuard)
	signup(@Req() req: Request,@Body() body: signup) {
	  return this.auth.signup(req.user,body);
	}
	
	@Get('42/redirect')
	@UseGuards(FT_GUARD)
	redirect(@Res() res: Response) {
	  res.redirect('/auth/42/status');
	}
	
	@Get('42/status')
	@UseGuards(AuthenticatedGuard)
	status(@Req() req: Request) {
	  return req.user;
	}
	
	@Get('42/logout')
	@UseGuards(AuthenticatedGuard)
	logout(@Req() req: Request) {
	  return req.user;
	}
}
