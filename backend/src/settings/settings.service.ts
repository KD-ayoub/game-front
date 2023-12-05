import { Injectable, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { SettingsDto } from './dto';
import { NotFoundError } from 'rxjs';
import * as speakeasy from "speakeasy";
import * as qrcode from 'qrcode';

@Injectable()
export class SettingsService {

  constructor(private prisma: PrismaService) {console.log("hey")}

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
    const data = await {
      id: commingData.id,
      name: commingData.full_name,
      nickName: commingData.nickName,
      fac_auth: commingData.fac_auth,
      photo_path: img.photo_path
    };
    return data;
  }

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
		return true;
    else
		return false
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
            photo_path: data.photo_path,
            TwoFac_pass: objFac.base32
          },
          select: {
            photo_path: true,
            TwoFac_pass: true
          }
        });
      }
      else {
        profile = await this.prisma.profile.update({
          where: {
            userID: userId,
          },
          data: {
            photo_path: data.photo_path,
          },
          select: {
            photo_path: true,
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
      user['photo_path'] = await profile.photo_path;
      if (data.fac_auth) {
        try {
          user['qr_code_url'] = await qrcode.toDataURL(profile.TwoFac_pass);
        } catch (err) {
          throw (err);
        }
      }



      //if (facCheck.fac_auth) {
      //  qrcode.toDataURL(this.objFac.otpauth_url, (err, data_url) => {
      //    console.log('<img src=\"', data_url, '\">');
      //  });
      //  if (data.name) {
      //    console.log('gg');
      //    let verify = speakeasy.totp.verify({
      //      secret: this.secret,
      //      encoding: 'base32',
      //      token: data.name
      //    })
      //    if (verify)
      //      console.log('code correct');
      //    else
      //      console.log('code uncorrect');
      //  }
      //  //user['qr_code'] = await secret.;
      //}
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
