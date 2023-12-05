import { Injectable, ExecutionContext , CanActivate, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'prisma/prisma.service';

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
		  //console.log(error)
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
    	return req.isAuthenticated();
	  	
	  } catch (error) {
		throw new HttpException('invalid token',HttpStatus.BAD_REQUEST);
	  }
  }
}

@Injectable()
export class first_timeGuard implements CanActivate{
	constructor(private prisma: PrismaService){}
	async canActivate(context: ExecutionContext): Promise<boolean>
	{
		const req = context.switchToHttp().getRequest();
		if (req.isAuthenticated())
		{
			const user = await this.prisma.user.findUnique({
				where: {
					id: req.user.id
				}
			})
			if (user.first_time)
			{
				const res = context.switchToHttp().getResponse();
				res.redirect("http://google.com");
			}
			if (user.fac_auth) // 2fa
			{
				//console.log(req.session);
				// get the 2fa from cookie and check it with the database pass
				console.log("test : ",req.session.passport.user);
				const profile = await this.prisma.profile.findUnique({
					where: {
						userID: user.id,
					}
				})
				throw new HttpException('2fa',HttpStatus.FORBIDDEN);
			}
		}
		return req.isAuthenticated();
	}
}
