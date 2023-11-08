import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
	constructor(private prisma : PrismaService){}

	async signup()
	{
		return {message: "signup was successful"}
	}

	async signin()
	{
		return {message: "signin was successful"}
	}

	async signout()
	{
		return {message: "signout was successful"}
	}
}
