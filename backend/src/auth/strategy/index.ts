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
            clientID: 'u-s4t2ud-e022f6535cf6a37e0d50bd177dd7e958bedba460d8c8da455b3a6f1e320c57a9', 
            clientSecret: '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',
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
