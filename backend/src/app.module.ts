import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { ChatModule } from './chat/chat.module';
import { PassportModule } from '@nestjs/passport';
import { LoggerMiddleware } from './common/utils/logger';

@Module({
  imports: [AuthModule,PrismaModule, ChatModule, PassportModule.register({session: true})],
})
//export class AppModule {}

export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
