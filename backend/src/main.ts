import { NestFactory } from '@nestjs/core';
import { ValidationPipe, RequestMethod } from '@nestjs/common';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaService } from 'prisma/prisma.service';

//cors

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(session({
	  cookie: {
		  maxAge: 60000 * 60 * 24,
	  },
	  secret: process.env.SESSION_SECRET,
	  resave: true,
	  saveUninitialized: false,
	  store: new PrismaSessionStore(
		  app.get(PrismaService),
		  {
			  checkPeriod: 2 * 60 * 1000,
			  dbRecordIdIsSessionId: true,
			  dbRecordIdFunction: undefined,
		  }
	  )
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.setGlobalPrefix('');

  
  app.enableCors({
    origin: 'http://localhost:3000',
    //origin: '*',
    credentials: true,
    //methods: [RequestMethod.ALL.toString()],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: 'Content-Type, Authorization',
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  await app.listen(3001);
}

bootstrap();
