import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { Strategy, VerifyCallback } from "passport-42";
import { UserDetails } from "src/utils/types";
import { User } from "@prisma/client";

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
		const details : User = {
			full_name: profile._json.usual_full_name,
			intra_42_id: profile._json.id,
			is_active: false,
			last_activity: new Date(),
			win: 0,
			lose: 0,
			games:0,
			id: "",
		};
		return await this.authService.validateUser(details);
    }
}
