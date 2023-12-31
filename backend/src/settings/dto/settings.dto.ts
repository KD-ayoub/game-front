import { IsBoolean, IsString, IsOptional } from 'class-validator';

export class SettingsDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  nickName: string;

  @IsBoolean()
  @IsOptional()
  fac_auth: boolean;

  @IsString()
  @IsOptional()
  photo_path: string;
};
