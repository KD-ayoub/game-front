import { Injectable, ExecutionContext , CanActivate } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class FT_GUARD extends AuthGuard('42') {
  async canActivate(context: ExecutionContext)
  {
      const activate =  (await super.canActivate(context)) as boolean;
	  const request = context.switchToHttp().getRequest();
	  await super.logIn(request);
	  return activate;
  }
}

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    return req.isAuthenticated();
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
				return false;
			if (user.fac_auth) // 2fa
				return true;
		}
		return req.isAuthenticated();
	}
}
