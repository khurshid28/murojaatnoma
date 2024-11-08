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
exports.ArizaController = void 0;
const common_1 = require("@nestjs/common");
const ariza_service_1 = require("./ariza.service");
const create_ariza_dto_1 = require("./dto/create-ariza.dto");
const bot_service_1 = require("../bot/bot.service");
const finish_ariza_dto_1 = require("./dto/finish-ariza.dto");
const cancel_ariza_dto_1 = require("./dto/cancel-ariza.dto");
const platform_express_1 = require("@nestjs/platform-express");
let ArizaController = class ArizaController {
    constructor(arizaService, botService) {
        this.arizaService = arizaService;
        this.botService = botService;
    }
    async getAll() {
        return await this.arizaService.getAll();
    }
    async getOne(id) {
        return await this.arizaService.getOne(id);
    }
    async create(body) {
        console.log(body);
        let ariza = await this.arizaService.create(body);
        this.botService.createArizaMessage(ariza);
        return ariza;
    }
    async finish(id, body, response) {
        console.log(response);
        if (body.response_type == "document" || body.response_type == "image") {
            body.response = response.path;
        }
        let ariza = await this.arizaService.finish(id, body);
        this.botService.sendRateMessage(id, ariza.chat_id, body);
        return ariza;
    }
    async cancel(id, body, response) {
        let ariza = await this.arizaService.cancel(id, body);
        if (body.response_type == "document" || body.response_type == "image") {
            body.response = response.path;
        }
        this.botService.sendCancelMessage(id, ariza.chat_id, body);
        return ariza;
    }
};
exports.ArizaController = ArizaController;
__decorate([
    (0, common_1.Get)('/all'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ArizaController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ArizaController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)('/create'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ariza_dto_1.CreateArizaDto]),
    __metadata("design:returntype", Promise)
], ArizaController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('/finish/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('response')),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, finish_ariza_dto_1.FinishArizaDto, Object]),
    __metadata("design:returntype", Promise)
], ArizaController.prototype, "finish", null);
__decorate([
    (0, common_1.Put)('/cancel/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('response')),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, cancel_ariza_dto_1.CancelArizaDto, Object]),
    __metadata("design:returntype", Promise)
], ArizaController.prototype, "cancel", null);
exports.ArizaController = ArizaController = __decorate([
    (0, common_1.Controller)('ariza'),
    __param(0, (0, common_1.Inject)()),
    __param(1, (0, common_1.Inject)()),
    __metadata("design:paramtypes", [ariza_service_1.ArizaService, bot_service_1.BotService])
], ArizaController);
//# sourceMappingURL=ariza.controller.js.map