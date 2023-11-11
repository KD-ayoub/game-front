import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthenticatedGuard, FT_GUARD } from './guards';

@Controller('auth')
export class AuthController {
	@Get('42/login')
	@UseGuards(FT_GUARD)
	login() {
	  return;
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
	}
}
