import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { LoggerMiddleware } from './common/utils/logger';
import { ProfileModule } from './profile/profile.module';
import { ProfileMiddleware } from './middleware/profile.middleware';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports:
	  [
	  	AuthModule,
	  	PrismaModule,
	  	PassportModule.register({session: true}),
	  	ProfileModule,
	  	SettingsModule
  ],
})

export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
}
