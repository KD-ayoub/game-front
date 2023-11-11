import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FT_Strategy } from './strategy';
import { SessionSerializer } from './utils/Serializer';

@Module({
  controllers: [AuthController],
  providers: [AuthService,FT_Strategy,SessionSerializer],
})
export class AuthModule {}
