import { Body, Controller, ForbiddenException, Get, HttpException, Put, Post, Redirect, Req, Res, Session, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthenticatedGuard, FT_GUARD, first_timeGuard } from './guards';
import { AuthService } from './auth.service';
import { _2fa, signup } from 'src/utils/types';
import { resolve } from 'path';
import { SettingsService } from 'src/settings/settings.service';


@Controller('auth')
export class AuthController {
	constructor(private auth: AuthService, private qr: SettingsService) {}

	// first path to log to intra  it redirect to 42 api
	@UseGuards(FT_GUARD)
	@Get('login')
	login() {
		console.log('login');
	  return ;
	}

	// 42 api redirect to this page and this page send a cookie
	@UseGuards(FT_GUARD)
	@Get('redirect')
	@Redirect('status')
	redirect(@Req() req: Request) {}

	//get data that needed in goodlogin
	@UseGuards(AuthenticatedGuard)
	@Get('goodlogin')
	getLoginData(@Req() req: any) {
		return this.auth.getLoginData(req.user.id);
	}
	
	// this route get user info for the first time	
	@UseGuards(AuthenticatedGuard)
	//@Get('signup')
	//async signup(@Req() req: any, @Res() res: Response) {
	@Put('signup')
	async signup(@Req() req: any, @Body() body: signup, @Res() res) {
		//here login of the guard
		console.log('ddd');
		return 'done';

		let redirectUrl = "http://localhost:3000/profile";
		const checkFirstTime = await this.auth.checkFirstTime(req.user.id);
		const twoFacCheck = await this.auth.check2fa(req.user.id);
		//here the user is logged and it's not his first time to log
		if (!checkFirstTime) {
			if (twoFacCheck)
				redirectUrl = "http://localhost:3000/twofactor";
			res.redirect(redirectUrl);
			return ;
		}
		//this one will be checked in pipe
		if (!body || !body.full_name ||!body.nickname )
			return {error : "Body is wrong"};
	  //this.auth.signup(req.user, body);
		//res.redirect("http://localhost:3000/auth");
	  return this.auth.signup(req.user, body);
	}

	// guards after checking 42 login and then check if first time and then check for 2fa
	@UseGuards(first_timeGuard)
	@Get('status')
	//@Redirect("http://google.com") // put the link of the profile
	status(@Req() req: any, @Res() res: Response) {
		res.redirect("http://localhost:3000/profile");
		return this.auth.getUserData(req.user.id);
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
	async _2fa(@Req() req: Request,@Body() body: _2fa,@Session() session: any,@Res() res)
	{
		// get the user and check if 2fa enabled
		const user = session.passport.user;
		let user_pr;

		if (user.id)
			user_pr = await this.auth.find_if_2fa_enabled(user.id);


		if (user_pr)
		{ 
			// redirect to profile
			return res.redirect("http://google.com")
		}


		let verify = await this.qr.checkIfQrCodeIsRight(user.id,user.code);
		console.log(verify);
		if (verify === false)
			throw  new ForbiddenException("code is not valid");
		user.code = body.code;

		req.session.save((err) => {
			if (err)
			{
				console.error(err);
				return;
			}
			return req.user;
		})
		// redirect to profile
		return res.redirect("http://google.com")
	}
}
