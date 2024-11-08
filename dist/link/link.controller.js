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
exports.LinkController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let LinkController = class LinkController {
    constructor(config) {
        this.config = config;
    }
    redirectToBotLink(res) {
        console.log('redirectToBotLink!');
        return res.redirect(this.config.get("BOT_LINK"));
    }
};
exports.LinkController = LinkController;
__decorate([
    (0, common_1.Get)('MirzoUlugbekMurojaatnomaBot'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LinkController.prototype, "redirectToBotLink", null);
exports.LinkController = LinkController = __decorate([
    (0, common_1.Controller)('link'),
    __param(0, (0, common_1.Inject)()),
    __metadata("design:paramtypes", [config_1.ConfigService])
], LinkController);
//# sourceMappingURL=link.controller.js.map