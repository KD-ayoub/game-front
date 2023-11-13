import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(session({
	  cookie: {
		  maxAge: 60000 * 60 * 24,
	  },
	  secret: process.env.SESSION_SECRET,
	  resave: false,
	  saveUninitialized: false,
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.setGlobalPrefix('');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  await app.listen(3001);
}

bootstrap();
