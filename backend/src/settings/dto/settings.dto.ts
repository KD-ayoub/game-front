import { IsBoolean, IsString, IsOptional } from 'class-validator';

export class SettingsDto {
  @IsString()
  @IsOptional()
  full_name: string;

  @IsString()
  @IsOptional()
  nickName: string;

  @IsBoolean()
  @IsOptional()
  fac_auth: boolean;
};
