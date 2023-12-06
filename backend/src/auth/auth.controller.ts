import { Body, Controller, Get, Post, Redirect, Req, Session, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedGuard, FT_GUARD, first_timeGuard } from './guards';
import { AuthService } from './auth.service';
import { _2fa, signup } from 'src/utils/types';
import { resolve } from 'path';


@Controller('auth')
export class AuthController {
	constructor(private auth: AuthService){}

	// first path to log to intra  it redirect to 42 api
	@UseGuards(FT_GUARD)
	@Get('/login')
	login() {
	  return;
	}

	// 42 api redirect to this page and this page send a cookie
	@UseGuards(FT_GUARD)
	@Get('/redirect')
	@Redirect('status')
	redirect(@Req() req: Request) 
	{
		console.log('hey');
		// redirect to  status
		return req.user;
	}

	// this route get user info for the first time	
	@UseGuards(AuthenticatedGuard)
	@Post('/signup')
	signup(@Req() req: Request,@Body() body: signup) {
		console.log("body : " , body);
		if (!body || !body.full_name ||!body.nickname )
			return {error : "sir t7wa gad l9lawi"};
		//console.log("hey : ",body);
	  return this.auth.signup(req.user,body);
	}

	// guards after checking 42 login and then check if first time and then check for 2fa
	@UseGuards(first_timeGuard)
	@Get('/status')
	@Redirect("http://localhost:3000/profile") // put the link of the profile
	status(@Req() req: Request) 
	{
	  return req.user;
	}
	
	@Get('/logout')
	@UseGuards(first_timeGuard)
	logout(@Req() req: Request) {
		req.session.destroy((err : any) => {
			if (err)
			{
				throw err;
			}
			resolve();
		});
	  return {logout: "seccussfuly"};
	}

	@Post('2fa')
	@UseGuards(AuthenticatedGuard)
	_2fa(@Req() req: Request,@Body() body: _2fa,@Session() session: any)
	{
		// get the user and check if 2fa enabled
		const user = session.passport.user;
		console.log(body);
		user.code = body.code;
		req.session.save((err) => {
			if (err)
			{
				console.error(err);
				return;
			}
			return req.user;
		})
	}
}
