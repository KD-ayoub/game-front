import { Injectable, ConflictException, ForbiddenException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { SettingsDto } from './dto';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async getSettingsData(userId: string): Promise<{}> {
    const img = await this.prisma.profile.findUnique({
      where: {
        userID: userId,
      },
      select: {
        photo_path: true,
      }
    })
    const commingData = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        nickName: true,
        fac_auth: true
      }
    });
    const data = await {
      id: commingData.id,
      name: commingData.name,
      nickName: commingData.nickName,
      fac_auth: commingData.fac_auth,
      photo_path: img.photo_path
    };
    return data;
  }

  async changeSettingsData(userId: string, data: SettingsDto): Promise<{}> {
    try {
      const user = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name: data.name,
          nickName: data.nickName,
          fac_auth: data.fac_auth
        },
        select: {
          id: true,
          name: true,
          nickName: true,
          fac_auth: true
        }
      });
      //if the user delete the img the frontend will send img: "default_img"
      const img = await this.prisma.profile.update({
        where: {
          userID: userId,
        },
        data: {
          photo_path: data.photo_path,
        },
        select: {
          photo_path: true,
        }
      })
      user['photo_path'] = img.photo_path;
      return user;
    } catch (err) {
      //check which error code
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException('Credentials already taken');
        }
      }
      throw err;
    }
  }
  
  async deleteAccountData(userId: string): Promise<any> {
    const deleteProfile = await this.prisma.profile.deleteMany({
      where: {
        userID: userId
      }
    });
    const deleteFriend = await this.prisma.friendship.deleteMany({
      where: {
        userId,
      }
    });
    const deleteAchievemnt = await this.prisma.achievement.deleteMany({
      where: {
        user_id: userId
      }
    });
    const deleteGame = await this.prisma.games_history.deleteMany({
      where: {
        player_id: userId
      }
    });
    //Those are for messages i will delete them after
    //const deleteParticipants = this.prisma.participants.deleteMany({
    //  where: {
    //  }
    //});
    //const deleteMessage = this.prisma.message.deleteMany({
    //});
    //const deleteConversation = this.prisma.conversation.deleteMany({
    //});
    const deleteUser = await this.prisma.user.deleteMany({
      where: {
        id: userId,
      }
    });
    //await this.prisma.$transaction([deleteProfile, deleteUser]);
    return 'done';
  }
}
