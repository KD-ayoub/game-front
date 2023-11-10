import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { Strategy, VerifyCallback } from "passport-42";
import { UserDetails } from "src/utils/types";

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
		console.log(profile._json.id);
		console.log(profile._json.login);
		console.log(profile._json.usual_full_name);
		console.log(profile._json.email);
		console.log(profile._json.image.link);
		const details : UserDetails = {
			email: profile._json.email,
			usual_full_name: profile._json.usual_full_name,
			id: profile._json.id,
			login: profile._json.login,
			image: profile._json.image.link
		};
		await this.authService.validateUser(details);
		 //i need to store the user data from here
    }
}
