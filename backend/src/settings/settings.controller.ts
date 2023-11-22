import { Controller, Get, Put, Delete, Body, UseGuards , Req } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { AuthenticatedGuard } from '../auth/guards';
import { SettingsDto } from './dto';

@Controller('settings')
@UseGuards(AuthenticatedGuard)
//here Guard to check if that user auth to access the settings of that user only not other user
//here check if the user sends the user header 
export class SettingsController {
  constructor(private SettingsService: SettingsService) {}

  @Get()
  getSettings(@Req() req: any) {
    return this.SettingsService.getSettingsData(req.user.id);
  }

  @Put()
  changeSettings(@Req() req: any, @Body() data: SettingsDto): Promise<{}> {
    //maybe here send all data of the user that got changed so the user stores them in the browser
    return this.SettingsService.changeSettingsData(req.user.id, data);
  }
  
  @Delete()
  deleteAccount(@Req() req: any): Promise<any> {
    return this.SettingsService.deleteAccountData(req.user.id);
  }
}
