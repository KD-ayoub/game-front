import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { ChatModule } from './chat/chat.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [AuthModule,PrismaModule, ChatModule, PassportModule.register({session: true})],
})
export class AppModule {}
