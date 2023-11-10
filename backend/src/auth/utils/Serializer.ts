import { PassportSerializer } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SessionSerializer extends PassportSerializer{
	constructor()
	{
		super();
	}
	serializeUser(user: any, done: (err: Error, user: any)=> void) {
		done(null,user);
	}
	deserializeUser(user: any, done: (err: Error, user: any)=> void)
	{
		done(null,user);
	}
}
