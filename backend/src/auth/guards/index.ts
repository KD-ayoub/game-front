import { Injectable, ExecutionContext , CanActivate, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'prisma/prisma.service';
import { SettingsService } from 'src/settings/settings.service';

@Injectable()
export class FT_GUARD extends AuthGuard('42') {
  async canActivate(context: ExecutionContext)
  {
	  try {
      	const activate =  (await super.canActivate(context)) as boolean;
	  	const request = context.switchToHttp().getRequest();
	  	await super.logIn(request);
	  	return activate;
	  	
	  } catch (error) {
		const res = context.switchToHttp().getResponse();
		res.redirect("http://localhost:3000/auth");
	  }
  }
}

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
	  try {
    	const req = context.switchToHttp().getRequest();
		if (req.isAuthenticated())
		{
			// redirect to profile
		}
		const res = context.switchToHttp().getResponse();
		res.redirect("http://localhost:3000/auth");
    	return req.isAuthenticated();
	  	
	  } catch (error) {
		throw new HttpException('invalid token',HttpStatus.BAD_REQUEST);
	  }
  }
}

@Injectable()
export class first_timeGuard implements CanActivate{
	constructor(private prisma: PrismaService,private qr: SettingsService){}
	async canActivate(context: ExecutionContext): Promise<boolean>
	{
		console.log("1");
		const req = context.switchToHttp().getRequest();
		if (req.isAuthenticated())
		{
			console.log("2");
			const user = await this.prisma.user.findUnique({
				where: {
					id: req.user.id
				}
			})
			if (user.first_time)
			{
				const res = context.switchToHttp().getResponse();
				res.redirect("http://localhost:3000/auth/good_login");
				return req.isAuthenticated();
			}
			if (user.fac_auth) // 2fa
			{
				const res = context.switchToHttp().getResponse();
				//console.log("test : ",req.session.passport.user);
				const user = req.session.passport.user;
				if (!user.code)
				{
					// redirect to 2fa page
					res.redirect("http://google.com");
				}
			}
			const res = context.switchToHttp().getResponse();
			res.redirect("http://localhost:3000/profile");
		}
		return req.isAuthenticated();
	}
}
