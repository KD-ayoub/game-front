import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import {intra_api_info, server_response, signup, user_request } from "src/utils/types"

@Injectable()
export class AuthService {
	constructor(private prisma : PrismaService){}
	async validateUser(details: intra_api_info)
	{
		const user = await this.prisma.user.findUnique({
			where: {
				intra_42_id: details.intra_42_id,
			}
		});
		if (user)
			return user;
		const newUser = await this.createUser(details);
		return newUser;
	}

	async createUser(details: intra_api_info)
	{
		//const user = await this.prisma.user.create({
		//	data : {
		//		nickName: details.login,
		//		full_name:  details.full_name,
		//		intra_42_id: details.intra_42_id,
		//		is_active :  "online",
		//		last_activity: new Date(),
		//	}
		//});
		//return user;
		return 0;
	}

	async findUser(details: intra_api_info)
	{
		const user = await this.prisma.user.findUnique({
			where: {
				intra_42_id: details.intra_42_id
			}
		});
		return user;
	}

	async signup(details: any,profile_data: signup)
	{
		const user: user_request = {
			full_name: details.full_name,
			login: details.login,
			id: details.id,
			intra_42_id: details.intra_42_id,
			first_time: details.first_time
		}

		const found_user = await this.prisma.user.update({
			where:{
				id: user.id,
			},
			data:{
				nickName: profile_data.login,
				full_name: profile_data.full_name,
				first_time: false,
			}
		})

		const response : server_response = {
			full_name: found_user.full_name,
			login: found_user.nickName,
				id: found_user.id,
			first_time: found_user.first_time,
			intra_42_id: found_user.intra_42_id
		}
		
		if (response.first_time == true)
		{
			//const found_profile = await this.prisma.profile.create({
			//	data:{
			//		userID: user.id,
			//		photo_path: profile_data.image,
			//		two_fa: profile_data._2fa,
			//		email: profile_data.email,
			//	}
			//})

		}
		return response;
	}
}
