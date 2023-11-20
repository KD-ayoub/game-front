import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async getMainData(userId: string): Promise<{}> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      }
    });
    const profile = await this.prisma.profile.findUnique({
      where: {
        userID: userId,
      }
    });
    if (!user || !profile)
      throw new NotFoundException();
    const data = await {
      id: user.id,
      full_name: user.full_name,
      nickName: user.nickName,
      is_active: user.is_active,
      last_activity: user.last_activity,
      photo_path: profile.photo_path,
      friend_number: profile.friend_number,
      level: profile.level,
    };
    return data;
  }

  async getGameHistoryData(userId: string): Promise<any> {
    const game = await this.prisma.games_history.findMany({
      where: {
        player_id: userId,
      }
    });
    if (!game.length)
      throw new NotFoundException();
    for (let i = 0; i < game.length; i++)
      game[i]['opponent_data'] = await this.getOtherUserData(game[i].opponent_id);
    return game;
  }

  //this get data of the opponent game history
  async getOtherUserData(userId: string): Promise<any> {
    const opponent = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        full_name: true,
        nickName: true,
      }
    });
    const profile = await this.prisma.profile.findUnique({
      where: {
        userID: userId,
      },
      select: {
        photo_path: true,
      }
    })
    if (!opponent || !profile)
      throw new NotFoundException();
    const data = await {
      id: opponent.id,
      full_name: opponent.full_name,
      nickName: opponent.nickName,
      photo_path: profile.photo_path,
    };
    return data;
  }

  async getStatusGameData(userId: string): Promise<{}> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      }
    });
    if (!user)
      throw new NotFoundException();
    const data = await {
      games: user.games,
      win: user.win,
      lose: user.lose
    };
    return data;
  }

  async getAchievementData(userId: string): Promise<{}> {
    const commingData = await this.prisma.achievement.findUnique({
      where: {
        user_id: userId
      }
    });
    if (!commingData)
      throw new NotFoundException();
    return commingData;
  }

  async getFriendsData(userId: string): Promise<any> {
    const data = [];
    const commingData = await this.prisma.friendship.findMany({
      where: {
        userId,
      },
      select: {
        friendId: true,
      }
    });
    if (!commingData.length)
      throw new NotFoundException();
    for (let i = 0; i < commingData.length; i++) {
      await data.push(await this.getOtherUserData(commingData[i].friendId));
    }
    return data;
  }

  async getAllUsersData(userId: string): Promise<{}> {
    const img = await this.prisma.profile.findMany({
      select: {
        userID: true,
        photo_path: true,
      }
    });
    const commingData = await this.prisma.user.findMany({
      select: {
        id: true,
        full_name: true,
        nickName: true,
      }
    });
    if (!img.length || !commingData.length)
      throw new NotFoundException();
    commingData.forEach((data) => {
      data['photo_path'] = img.find((elem) => (elem.userID === data.id)).photo_path;
    })
    return commingData;
  }

  async addFriendData(idUserDb: string, idUserToAdd: string): Promise<{}> {
    if (idUserDb === idUserToAdd)
      throw new ConflictException('User can\'t be friend with it\'s self');
    const count = await this.prisma.friendship.count({
      where: {
        userId: idUserToAdd,
        friendId: idUserDb
      }
    });
    if (count)
      throw new ConflictException('Already friends');
    const commingData = await this.prisma.friendship.createMany({
      data: [
        {
          createdAt: new Date(),
          userId: idUserToAdd,
          friendId: idUserDb
        },
        {
          createdAt: new Date(),
          userId: idUserDb,
          friendId: idUserToAdd
        }
      ]
    });
    return { status: "Success" };
  }

  async removeFriendData(idUserDb: string, idUserToAdd: string): Promise<{}> {
    const search = await this.prisma.friendship.findMany();
    search.forEach( async (data) =>  {
      if (((data.userId === idUserDb) || (data.userId === idUserToAdd)) &&
         ((data.friendId === idUserDb) || (data.friendId === idUserToAdd))) {
        await this.prisma.friendship.delete({
          where: {
            id: data.id
          }
        });
      }
    });
    return { status: 'Success' };
  }
}
