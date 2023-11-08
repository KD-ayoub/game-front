import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [AuthModule,PrismaModule, ChatModule],
})
export class AppModule {}
