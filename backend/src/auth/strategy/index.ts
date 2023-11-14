import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { Strategy, VerifyCallback } from "passport-42";
import {intra_api_info} from "src/utils/types";

@Injectable()
export class FT_Strategy extends PassportStrategy(Strategy, '42') {
    constructor(private readonly authService: AuthService){
        super({
            clientID: process.env.CLIENTID, 
            clientSecret: process.env.CLIENT_SECRET,
			callbackURL: '/auth/42/redirect',
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any){
		const details : intra_api_info = {
			full_name: profile._json.usual_full_name,
			intra_42_id: profile._json.id,
			login: profile._json.login,
			email: profile._json.email,
			image: profile._json.image.link
		};
		return await this.authService.validateUser(details);
    }
}
