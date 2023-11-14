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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileController = void 0;
const common_1 = require("@nestjs/common");
const profile_service_1 = require("./profile.service");
let ProfileController = class ProfileController {
    constructor(ProfileService) {
        this.ProfileService = ProfileService;
    }
    getMain(id) {
        return this.ProfileService.getMainData(id);
    }
    getGameHistory(id) {
        return this.ProfileService.getGameHistoryData(id);
    }
    getStatusGame(id) {
        return this.ProfileService.getStatusGameData(id);
    }
    getAchievement(id) {
        return this.ProfileService.getAchievementData(id);
    }
    getFriends() {
        return this.ProfileService.getFriendsData();
    }
};
exports.ProfileController = ProfileController;
__decorate([
    (0, common_1.Get)('main'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getMain", null);
__decorate([
    (0, common_1.Get)('game_history'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getGameHistory", null);
__decorate([
    (0, common_1.Get)('status_game'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getStatusGame", null);
__decorate([
    (0, common_1.Get)('achievement'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getAchievement", null);
__decorate([
    (0, common_1.Get)('friends'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], ProfileController.prototype, "getFriends", null);
exports.ProfileController = ProfileController = __decorate([
    (0, common_1.Controller)('profile/:id'),
    __metadata("design:paramtypes", [profile_service_1.ProfileService])
], ProfileController);
//# sourceMappingURL=profile.controller.js.map