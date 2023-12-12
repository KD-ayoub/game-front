import { ConflictException, ForbiddenException, Injectable, Param, UnauthorizedException } from '@nestjs/common';
import { profile } from 'console';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { server_response, signup, user_request } from "src/utils/types"

@Injectable()
export class AuthService {
	constructor(private prisma : PrismaService){}

	//here logic hicham
	async getLoginData(userId: string): Promise<{}> {
		const user = await this.prisma.user.findUnique({
			where: {
				id: userId
			},
			select: {
				full_name: true,
				nickName: true
			}
		});
		const profile = await this.prisma.profile.findUnique({
			where: {
				userID: userId
			},
			select: {
				photo_path: true
			}
		});
		user['photo_user'] = profile.photo_path;
		return user;
	}
	
	async	checkFirstTime(userId: string): Promise<boolean> {
		const commingData = await this.prisma.user.findUnique({
			where: {
				id: userId
			},
			select: {
				first_time: true
			}
		});
		//await console.log('dd ',commingData.first_time);
		if (!commingData)
			return false;
		return commingData.first_time;
	}

	async getUserData(userId: string): Promise<{}> {
		const commingData = await this.prisma.user.findUnique({
			where: {
				id: userId
			},
			select: {
				id: true,
				full_name: true,
				nickName: true
			}
		});
		//check if exists
		return await commingData;
	}

	async check2fa(userId: string) {
		const commingData = await this.prisma.user.findUnique({
			where: {
				id: userId
			},
			select: {
				fac_auth: true
			}
		});
		return await commingData.fac_auth;
	}

	async getUserStatus(userId: string): Promise<{}> {
		const user = await this.prisma.user.findUnique({
			where: {
				id: userId
			},
			select: {
				id: true,
				full_name: true,
				nickName: true
			}
		});
		return await user;
	}
	//

	async validateUser(details : any)
	{
		console.log('validateUser func');
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
		console.log('create user func');
		try {
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
			//here change the img
			const profile = await this.prisma.profile.create({
				data:{
					userID: user.id,
					photo_path: details.image
				}
			})
			return user;
		} catch(err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ForbiddenException('Can\'t create the user');
      }
      throw err;
		}
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

	async signup(details: any, profile_data: signup)
	{
		//this one should be taking down
		console.log('f service db');
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
				},
				select:{
					id: true,
					full_name: true,
					nickName: true,
					first_time: true,
					intra_42_id: true,
				}
			})

			// create the response if succesfull
			//this one should be taking down
			const response : server_response = {
				full_name: found_user.full_name,
				nickname: found_user.nickName,
				id: found_user.id,
				first_time: found_user.first_time, intra_42_id: found_user.intra_42_id
			}
			
			console.log('f service before returning');
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
