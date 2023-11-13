import { Controller, Get, Param } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile/:id')
//here a guard who check if the user authenticate
//if the user give 'me' you should check the user authenticate with the same token
//if the user was an uid check it and send data
export class ProfileController {
  constructor(private ProfileService: ProfileService) {}

  @Get('main')
  getMain(@Param('id') id: any): Promise<{}> {
    return this.ProfileService.getMainData(id);
  }

  @Get('games_history')
  getGameHistory(@Param('id') id: any): Promise<any> {
    return this.ProfileService.getGameHistoryData(id);
  }

  @Get('other_user')
  getOtherUser(@Param('id') id: any): Promise<any> {
    return this.ProfileService.getOtherUserData(id);
  }
  
  @Get('status_game')
  getStatusGame(@Param('id') id: any): Promise<{}> {
    return this.ProfileService.getStatusGameData(id);
  }

  @Get('achievement')
  getAchievement(@Param('id') id: any): Promise<{}> {
    return this.ProfileService.getAchievementData(id);
  }

  @Get('friends')
  getFriends(@Param('id') id: any): Promise<{}> {
    return this.ProfileService.getFriendsData(id);
  }

  @Get('get_all_users')
  getAllUsers(@Param('id') id: any): Promise<{}> {
    return this.ProfileService.getAllUsersData(id);
  }
}