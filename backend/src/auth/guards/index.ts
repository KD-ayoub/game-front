import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class FT_GUARD extends AuthGuard('42') {
  async canActivate(context: ExecutionContext): Promise<any> {
	  console.log("------------ in guard ------------------");
      const activate =  await (super.canActivate(context)) as boolean;
	  console.log(activate);
	  console.log("-------------------------");
	  const request = context.switchToHttp().getRequest();
	  console.log(request);
	  await super.logIn(request);
	  return activate;
  }
}
