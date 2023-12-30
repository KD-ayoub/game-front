import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { LoggerMiddleware } from './common/utils/logger';
import { ProfileModule } from './profile/profile.module';
import { SettingsModule } from './settings/settings.module';
import { GameModule } from './game/game.module';
import { AppGateway } from './app.gateway';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports:
	  [
	  	AuthModule,
	  	PrismaModule,
	  	PassportModule.register({session: true}),
	  	ProfileModule,
	  	SettingsModule,
			CloudinaryModule,
			GameModule,
			ChatModule
  ],
})

export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
