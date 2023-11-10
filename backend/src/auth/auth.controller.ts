import { Controller ,Get, Res, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { FT_GUARD } from './guards';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}



  @UseGuards(FT_GUARD)
  @Get('42/login')
  login()
  {
	  return ;
  }

  @Get('42/redirect')
  @UseGuards(FT_GUARD)
  redirect(@Res() res: Response)
  {
	  res.send(200);
  }

  @UseGuards(FT_GUARD)
  @Get('42/test')
  test()
  {
	  console.log("test");
	  return {test: "test"};
  }
}
