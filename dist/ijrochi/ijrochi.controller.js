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
exports.IjrochiController = void 0;
const common_1 = require("@nestjs/common");
const ijrochi_service_1 = require("./ijrochi.service");
const create_ijrochi_dto_1 = require("./dto/create-ijrochi.dto");
let IjrochiController = class IjrochiController {
    constructor(ijrochiService) {
        this.ijrochiService = ijrochiService;
    }
    async getAll() {
        return await this.ijrochiService.getAll();
    }
    async getOne(id, arizalar) {
        return await this.ijrochiService.getOne(id, arizalar);
    }
    async create(body) {
        return await this.ijrochiService.create(body);
    }
    async delete(id) {
        return await this.ijrochiService.delete(id);
    }
};
exports.IjrochiController = IjrochiController;
__decorate([
    (0, common_1.Get)('/all'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IjrochiController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Query)("arizalar")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], IjrochiController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)('/create'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ijrochi_dto_1.CreateIjrochiDto]),
    __metadata("design:returntype", Promise)
], IjrochiController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], IjrochiController.prototype, "delete", null);
exports.IjrochiController = IjrochiController = __decorate([
    (0, common_1.Controller)('ijrochi'),
    __param(0, (0, common_1.Inject)()),
    __metadata("design:paramtypes", [ijrochi_service_1.IjrochiService])
], IjrochiController);
//# sourceMappingURL=ijrochi.controller.js.map