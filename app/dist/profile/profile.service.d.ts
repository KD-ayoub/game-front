import { PrismaService } from '../prisma/prisma.service';
export declare class ProfileService {
    private prisma;
    constructor(prisma: PrismaService);
    getMainData(userId: string): Promise<any>;
    getGameHistoryData(userId: string): Promise<any>;
    getStatusGameData(userId: string): Promise<{}>;
    getAchievementData(userId: string): Promise<{}>;
    getFriendsData(): string;
}
