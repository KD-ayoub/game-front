import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FT_Strategy } from './strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService,FT_Strategy],
})
export class AuthModule {}
