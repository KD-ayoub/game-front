import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { server_response, signup, user_request } from "src/utils/types"

@Injectable()
export class AuthService {
	constructor(private prisma : PrismaService){}
	async validateUser(details : any)
	{
		const user = await this.prisma.user.findUnique({
			where: {
				intra_42_id: details.intra_42_id,
			},
			select: {
				intra_42_id : true,
				id: true,
				nickName: true,
				first_time: true,
				full_name: true,
			}
		});
		if (user)
			return user;
		const newUser = await this.createUser(details);
		return newUser;
	}

	async createUser(details: any)
	{
		const user = await this.prisma.user.create({
			data : {
				nickName: details.login,
				full_name:  details.full_name,
				intra_42_id: details.intra_42_id,
				is_active :  "online",
				last_activity: new Date(),
			},
			select: {
				intra_42_id : true,
				id: true,
				nickName: true,
				first_time: true,
				full_name: true,
			}

		});
		const profile = await this.prisma.profile.create({
			data:{
				userID: user.id,
			}
		})
		return user;
	}

	async findUser(details: any)
	{
		const user = await this.prisma.user.findUnique({
			where: {
				intra_42_id: details.intra_42_id
			},
			select:{
				intra_42_id : true,
				id: true,
				full_name: true,
				nickName: true,
				first_time: true,
			}

		});
		return user;
	}

	async signup(details: any,profile_data: signup)
	{
		const user: user_request = {
			full_name: details.full_name,
			nickname: details.nickname,
			id: details.id,
			intra_42_id: details.intra_42_id,
			first_time: details.first_time
		}

		if (!user.first_time)
			throw new UnauthorizedException("already registred");
		try {

			// update user nickname full_name first_time
			const found_user = await this.prisma.user.update({
				where:{
					id: user.id,
				},
				data:{
					nickName: profile_data.nickname,
					full_name: profile_data.full_name,
					first_time: false,
				}
			})

			// create the profile and link it with the user
			await this.prisma.profile.create({
				data:{
					userID: user.id,
				}
			})

			// create the response if succesfull
			const response : server_response = {
				full_name: found_user.full_name,
				nickname: found_user.nickName,
				id: found_user.id,
				first_time: found_user.first_time,
				intra_42_id: found_user.intra_42_id
			}
			
			return response;
		} catch (error) {
			throw new ConflictException("nickname is already taken");
		}
			
	}

	async find_if_2fa_enabled(id: string)
	{
		const user = await this.prisma.user.findUnique({
			where : {
				id
			},
			select:{
				fac_auth: true
			}
		})
		return user.fac_auth;
	}

	async delete_old_sessions(id: string)
	{
		await this.prisma.session.deleteMany({
			where: {
				data: {
					search: id 
				}
			}
		});
	}
}
