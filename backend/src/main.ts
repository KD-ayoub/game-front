import { NestFactory } from '@nestjs/core';
import { ValidationPipe, RequestMethod } from '@nestjs/common';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cors from 'cors';

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

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: [RequestMethod.ALL.toString()],
  });
  //app.use(cors());

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  await app.listen(3001);
}

bootstrap();
