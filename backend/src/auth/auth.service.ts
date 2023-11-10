import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UserDetails } from 'src/utils/types';

@Injectable()
export class AuthService {
	constructor(private prisma : PrismaService){}
	async validateUser(details: UserDetails)
	{

		const user = await this.prisma.user.findUnique({
			where: {
				intra_42_id: details.id,
			}
		});
		if (user)
		{
			console.log(user);
			return user;
		}

		const newUser = await this.createUser(details);
	}

	async createUser(details: UserDetails)
	{
		console.log("create user");
		const user = this.prisma.user.create({
			data: {
				full_name:  details.usual_full_name,
				intra_42_id: details.id,
				is_active :  false,
				last_activity: new Date(),
			}
		});
		console.log("hey");
	}

	findUser()
	{
	}
}
