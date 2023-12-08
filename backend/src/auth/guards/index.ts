import { Injectable, ExecutionContext , CanActivate, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'prisma/prisma.service';
import { SettingsService } from 'src/settings/settings.service';

@Injectable()
export class FT_GUARD extends AuthGuard('42') {
  async canActivate(context: ExecutionContext)
  {
	  try {
			//console.log(context);
			//throw "hey";
			//return true;
			console.log('hey');
      const activate = (await super.canActivate(context)) as boolean;
			await console.log(`1 ft_guard ${activate}`);
	  	const request = context.switchToHttp().getRequest();
	  	await super.logIn(request);
			await console.log(`2 ft_guard ${activate}`);
	  	return activate;
	  } catch (error) {
			console.log('err = ', error);
			const res = context.switchToHttp().getResponse();
			res.redirect("http://localhost:3000/auth");
	  }
  }
}

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
	  try {
			console.log('authenticatedGuard');
    	const req = context.switchToHttp().getRequest();
			//if (req.isAuthenticated()) {
			//	// redirect to profile
			//}
			console.log(req.isAuthenticated());
			//const res = context.switchToHttp().getResponse();
			//res.redirect("http://localhost:3000/auth");
			//console.log('db f guard ', req.isAuthenticated);
			//console.log(res);
			//return true;
    	return req.isAuthenticated();
	  } catch (error) {
			throw new HttpException('invalid token',HttpStatus.BAD_REQUEST);
	  }
  }
}

@Injectable()
export class first_timeGuard implements CanActivate{
	constructor(private prisma: PrismaService, private qr: SettingsService) {}

	async canActivate(context: ExecutionContext): Promise<boolean>
	{
		console.log("1d");
		const req = context.switchToHttp().getRequest();
		const res = context.switchToHttp().getResponse();
		if (!req.isAuthenticated()) {
			res.redirect("http://localhost:3000/auth");
			return req.isAuthenticated();
		}
			
		const user = await this.prisma.user.findUnique({
			where: {
				id: req.user.id
			},
			select: {
				first_time: true,
				fac_auth: true
			}
		})
		if (user.first_time) {
			//const res = context.switchToHttp().getResponse();
			res.redirect("http://localhost:3000/auth/goodlogin");
			return false;
		}
		if (user.fac_auth) // 2fa
		{
			//const res = context.switchToHttp().getResponse();
			//console.log("test : ",req.session.passport.user);
			console.log('2fa guard');
			const user = req.session.passport.user;
			//user['ok'] = 'll';
			console.log(user);
			if (!user.code)
			{
				// redirect to 2fa page
				res.redirect("http://localhost:3000/auth/twofactor");
				return false;
			}
		}
		//const res = context.switchToHttp().getResponse();
		//res.redirect("http://localhost:3000/profile");
		return req.isAuthenticated();
	}
}
