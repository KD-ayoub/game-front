import { Body, Controller, Get, Post, Req, Session, UseGuards, Redirect } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedGuard, FT_GUARD, first_timeGuard } from './guards';
import { AuthService } from './auth.service';
import { signup } from 'src/utils/types';
import { resolve } from 'path';


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
	@Redirect('http://localhost:3000/auth/good_login')
	@UseGuards(FT_GUARD)
	redirect(@Req() req: Request) 
	{
		// return here if first time
		return req.user;
	}

	// this route get user info for the first time	
	@Post('/signup')
	@UseGuards(AuthenticatedGuard)
	signup(@Req() req: Request,@Body() body: signup) {
		console.log(body);
	  return this.auth.signup(req.user,body);
	}

	// guards after checking 42 login and then check if first time and then check for 2fa
	@Get('/status')
	@UseGuards(first_timeGuard)
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

	@Get("/test")
	@UseGuards(first_timeGuard)
	test()
	{
		return "test";
	}


	@Post('2fa')
	_2fa(@Req() req: Request,@Body() body: signup,@Session() session: any)
	{
		// get the user and check if 2fa enabled
		const user = session.passport.user;
		user.blan = "hey";
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
