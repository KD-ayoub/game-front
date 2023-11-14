import { ProfileService } from './profile.service';
export declare class ProfileController {
    private ProfileService;
    constructor(ProfileService: ProfileService);
    getMain(id: any): Promise<any>;
    getGameHistory(id: any): Promise<any>;
    getStatusGame(id: any): Promise<{}>;
    getAchievement(id: any): Promise<{}>;
    getFriends(): string;
}
