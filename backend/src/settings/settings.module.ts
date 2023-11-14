import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';

@Module({
  imports: [],
  controllers: [SettingsController],
  providers: [SettingsService],
  exports: []
})
export class SettingsModule {}
