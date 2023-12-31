import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { Strategy, Profile } from "passport-42";

@Injectable()
export class FT_Strategy extends PassportStrategy(Strategy, '42') {
    constructor(private readonly authService: AuthService){
        super({
            clientID: process.env.CLIENTID, 
            clientSecret: process.env.CLIENT_SECRET,
			callbackURL: '/auth/redirect',
			Scope: ['profile'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile){
		const details : any = {
			full_name: profile._json.usual_full_name,
			intra_42_id: profile._json.id,
			login: profile._json.login,
			email: profile._json.email,
			image: profile._json.image.link
		};
		return await this.authService.validateUser(details);
    }
}
