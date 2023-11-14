import { PassportSerializer } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { intra_api_info, server_response } from "src/utils/types";

@Injectable()
export class SessionSerializer extends PassportSerializer{
	constructor(private readonly authService: AuthService)
	{
		super();
	}
	serializeUser(user: intra_api_info, done: (err: Error, user: any)=> void) {
		done(null,user);
	}
	async deserializeUser(user: intra_api_info, done: (err: Error, user: any)=> void)
	{
		const userDB = await this.authService.findUser(user);
		const found : server_response = {
			full_name: userDB.full_name,
			id: userDB.id,
			intra_42_id: userDB.intra_42_id,
			login: userDB.nickName,
			first_time: userDB.first_time,
		}
		return userDB ? done(null,found):  done(null, null);
	}
}
