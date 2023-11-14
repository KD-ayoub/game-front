"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProfileService = class ProfileService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getMainData(userId) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            }
        });
        await delete user.games;
        await delete user.win;
        await delete user.lose;
        return user;
    }
    async getGameHistoryData(userId) {
        const game = await this.prisma.games_history.findMany({
            where: {
                player_id: userId,
            }
        });
        return game;
    }
    async getStatusGameData(userId) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            }
        });
        const data = await {
            games: user.games,
            win: user.win,
            lose: user.lose
        };
        return data;
    }
    async getAchievementData(userId) {
        const commingData = await this.prisma.achievement.findUnique({
            where: {
                user_id: userId
            }
        });
        return commingData;
    }
    getFriendsData() {
        return 'Here the Friends data :)';
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProfileService);
//# sourceMappingURL=profile.service.js.map