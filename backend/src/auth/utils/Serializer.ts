import { PassportSerializer } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { User } from "@prisma/client";

@Injectable()
export class SessionSerializer extends PassportSerializer{
	constructor(private readonly authService: AuthService)
	{
		super();
	}
	serializeUser(user: User, done: (err: Error, user: any)=> void) {
		done(null,user);
	}
	async deserializeUser(user: User, done: (err: Error, user: any)=> void)
	{
		const userDB = await this.authService.findUser(user);
		return userDB ? done(null,user):  done(null, null);
	}
}
