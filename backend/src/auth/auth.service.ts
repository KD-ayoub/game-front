import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
	constructor(private prisma : PrismaService){}
	async validateUser(details: User)
	{

		const user = await this.prisma.user.findUnique({
			where: {
				intra_42_id: details.intra_42_id,
			}
		});
		if (user)
		{
			console.log(user);
			return user;
		}

		const newUser = await this.createUser(details);
		return newUser;
	}

	async createUser(details: User)
	{
		const user = await this.prisma.user.create({
			data: {
				full_name:  details.full_name,
				intra_42_id: details.intra_42_id,
				is_active :  false,
				last_activity: new Date(),
			}
		});
		return user;
	}

	async findUser(details: User)
	{
		const user = await this.prisma.user.findUnique({
			where: {
				intra_42_id: details.intra_42_id
			}
		});
		return user;
	}
}
