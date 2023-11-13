import { Controller, Get, Put, Delete, Body, Headers } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsDto } from './dto';

@Controller('settings')
//here Guard to check if that user auth to access the settings of that user only not other user
//here check if the user sends the user header 
export class SettingsController {
  constructor(private SettingsService: SettingsService) {}

  @Get()
  getSettings(@Headers('user') userId: string): Promise<{}> {
    return this.SettingsService.getSettingsData(userId);
  }

  @Put()
  changeSettings(@Headers('user') userId: string, @Body() data: SettingsDto): Promise<{}> {
    //maybe here send all data of the user that got changed so the user stores them in the browser
    return this.SettingsService.changeSettingsData(userId, data);
  }
  
  @Delete()
  deleteAccount(@Headers('user') userId: string): Promise<any> {
    return this.SettingsService.deleteAccountData(userId);
  }
}
