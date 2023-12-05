import { Controller, Get, Put, Delete, Body, UseGuards , Req } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { AuthenticatedGuard } from '../auth/guards';
import { SettingsDto } from './dto';

//upload
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('settings')
@UseGuards(AuthenticatedGuard)
//here Guard to check if that user auth to access the settings of that user only not other user
//here check if the user sends the user header 
export class SettingsController {
  //constructor(private SettingsService: SettingsService) {}
  constructor(private SettingsService: SettingsService) {}

  @Get()
  getSettings(@Req() req: any) {
    console.log("entred in get");
    return this.SettingsService.getSettingsData(req.user.id);
  }

  @Put('update_image')
  @UseInterceptors(FileInterceptor('file'))
  changeImageSettings(@UploadedFile() file: Express.Multer.File, @Req() req: any): Promise<{}>{
    //here remove image if file is empty
    return this.SettingsService.changeSettingsImage(file, req.user.id);
  }
  //maybe here add a delete endpoint for deleting the image
  
  @Put('update_data')
  changeSettings(@Req() req: any, @Body() data: SettingsDto): any {
    //wtf here pipe not working
    //console.log(JSON.stringify(data));
    if (!JSON.stringify(data) || JSON.stringify(data) === '{}')
      return data;
    return this.SettingsService.changeSettingsData(req.user.id, data);
  }

  @Delete('delete_image')
  deleteImage(@Req() req: any): Promise<any> {
    return this.SettingsService.deleteImageData(req.user.id);
  }

  @Delete()
  deleteAccount(@Req() req: any): Promise<any> {
    return this.SettingsService.deleteAccountData(req.user.id);
  }
}
