import { Injectable, NotFoundException, ConflictException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { SettingsDto } from './dto';
import { NotFoundError } from 'rxjs';
import * as speakeasy from "speakeasy";
import * as qrcode from 'qrcode';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class SettingsService {
  private hld: string;
  constructor(private prisma: PrismaService, private cloudinaryService: CloudinaryService) {}

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
        full_name: true,
        nickName: true,
        fac_auth: true
      }
    });
    if (!img || !commingData)
      throw new NotFoundException();
    commingData['photo_path'] = await img.photo_path;
    return commingData;
  }

  //take it off
  async checkIfQrCodeIsRight(userId: string, token: string): Promise<{}> {
    const profile = await this.prisma.profile.findUnique({
      where: {
        userID: userId,
      },
      select: {
        TwoFac_pass: true
      }
    });
    let verify = speakeasy.totp.verify({
      secret: profile.TwoFac_pass,
      encoding: 'base32',
      token
    })
    if (verify)
      console.log('code correct');
    else
      console.log('code uncorrect');

    return profile;
  }

  async deleteImageData(userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        userID: userId
      },
      select: {
        photoID: true,
        photo_path: true
      }
    });
    if (profile.photoID !== "default_img") {
      //console.log('ll');
      //this one put it in try/catch
      this.cloudinaryService.deleteFile(profile.photoID);
      await this.prisma.profile.update({
        where: {
          userID: userId,
        },
        data: {
          //photo_path: (file) ? upload.secure_url : "default_img",
          photo_path: "default_img",
          photoID: "default_img"
        },
      });
    }
    return {
      photo_path: "default_img"
    };
    //this.cloudinaryService.deleteFile(this.hld);
  }

  async changeSettingsImage(file: Express.Multer.File, userId: string): Promise<{}> {
    try {
      let upload;

      //if (file) {
      const commingData = await this.prisma.profile.findUnique({
        where: {
          userID: userId
        },
        select: {
          photoID: true,
          photo_path: true
        }
      });
      if (commingData.photoID !== "default_img") {
        this.cloudinaryService.deleteFile(commingData.photoID);
      }
      upload = await this.cloudinaryService.uploadFile(file);
        //this.hld = await upload.public_id;
        //await console.log(this.hld);
        //await console.log(upload);
      //}
      //else {
      //  console.log('ll ', this.hld);
      //  this.cloudinaryService.deleteFile(this.hld);
      //}
      const profile = await this.prisma.profile.update({
        where: {
          userID: userId,
        },
        data: {
          //photo_path: (file) ? upload.secure_url : "default_img",
          photo_path: upload.secure_url,
          photoID: upload.public_id
        },
        select: {
          photo_path: true,
        }
      });
      return {
        photo_path: profile.photo_path
      };
    } catch(err) {
      throw new BadRequestException();
    }
  }

  async changeSettingsData(userId: string, data: SettingsDto): Promise<{}> {
    try {
      let objFac;
      let profile;

      const facCheck = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          fac_auth: true,
        }
      });
      if (!facCheck.fac_auth && data.fac_auth) {
        objFac = speakeasy.generateSecret();
        profile = await this.prisma.profile.update({
          where: {
            userID: userId,
          },
          data: {
            TwoFac_pass: objFac.base32
          },
          select: {
            TwoFac_pass: true
          }
        });
      }
      else {
        profile = await this.prisma.profile.findUnique({
          where: {
            userID: userId,
          },
          select: {
            TwoFac_pass: true
          }
        });
      }
      const user = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          full_name: data.name,
          nickName: data.nickName,
          fac_auth: data.fac_auth
        },
        select: {
          id: true,
          full_name: true,
          nickName: true,
          fac_auth: true
        }
      });
      if (data.fac_auth) {
        try {
          user['qr_code_url'] = await qrcode.toDataURL(profile.TwoFac_pass);
        } catch (err) {
          throw (err);
        }
      }
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
    //this one need more work exception and delete messages and shit
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
