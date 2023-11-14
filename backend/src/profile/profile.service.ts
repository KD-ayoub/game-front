import { Injectable, NotFoundException } from '@nestjs/common';
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
    const commingData = await this.prisma.user.findMany({
      select: {
        id: true,
        full_name: true,
        nickName: true,
      }
    });
    return commingData;
  }
}
