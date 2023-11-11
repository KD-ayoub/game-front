import { Injectable, ExecutionContext , CanActivate } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class FT_GUARD extends AuthGuard('42') {
  async canActivate(context: ExecutionContext)
  {
	  //console.log("------------ in guard ------------------");
      const activate =  (await super.canActivate(context)) as boolean; // i changed here
	  //console.log(activate);
	  //console.log("-------------------------");
	  const request = context.switchToHttp().getRequest();
	  console.log(request);
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
