import { Body, Controller, ForbiddenException, Get, HttpException, Post, Redirect, Req, Res, Session, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedGuard, FT_GUARD, first_timeGuard } from './guards';
import { AuthService } from './auth.service';
import { _2fa, signup } from 'src/utils/types';
import { resolve } from 'path';
import { SettingsService } from 'src/settings/settings.service';


@Controller('auth')
export class AuthController {
	constructor(private auth: AuthService, private qr: SettingsService){}

	// first path to log to intra  it redirect to 42 api
	@UseGuards(FT_GUARD)
	@Get('/login')
	login() {
		console.log('lll');
	  return;
	}

	// 42 api redirect to this page and this page send a cookie
	@UseGuards(FT_GUARD)
	@Get('/redirect')
	@Redirect('status')
	redirect(@Req() req: Request) {
		console.log('redirect');
	}

	// this route get user info for the first time	
	@UseGuards(AuthenticatedGuard)
	@Post('/signup')
	signup(@Req() req: Request,@Body() body: signup) {
		if (!body || !body.full_name ||!body.nickname )
			return {error : "sir t7wa gad l9lawi"};
	  	return this.auth.signup(req.user,body);
	}

	// guards after checking 42 login and then check if first time and then check for 2fa
	@UseGuards(first_timeGuard)
	@Get('/status')
	//@Redirect("http://google.com") // put the link of the profile
	status(@Req() req: Request) {}
	
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
