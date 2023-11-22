import { PassportSerializer } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { server_response } from "src/utils/types";

@Injectable()
export class SessionSerializer extends PassportSerializer{
	constructor(private readonly authService: AuthService)
	{
		super();
	}
	serializeUser(user, done: (err: Error, user: any)=> void) {
		done(null,user);
	}
	async deserializeUser(user, done: (err: Error, user: any)=> void)
	{
		const userDB = await this.authService.findUser(user);
		const found : server_response = {
			full_name: userDB.full_name,
			id: userDB.id,
			intra_42_id: userDB.intra_42_id,
			nickname: userDB.nickName,
			first_time: userDB.first_time,
		}
		return userDB ? done(null,found):  done(null, null);
	}
}
