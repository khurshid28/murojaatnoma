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
exports.ArizaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ariza_entity_1 = require("./entity/ariza.entity");
const typeorm_2 = require("typeorm");
const ijrochi_entity_1 = require("../ijrochi/entity/ijrochi.entity");
const fs_1 = require("fs");
let ArizaService = class ArizaService {
    constructor(arizaRepo, ijrochiRepo) {
        this.arizaRepo = arizaRepo;
        this.ijrochiRepo = ijrochiRepo;
    }
    async getAll() {
        let ariza = await this.arizaRepo.find({
            relations: {
                ijrochi: true
            }
        });
        return ariza;
    }
    async getOne(id) {
        let ariza = await this.arizaRepo.findOne({
            where: { id },
            relations: { ijrochi: true }
        });
        if (!ariza) {
            throw new common_1.NotFoundException("Ariza topilmadi");
        }
        return ariza;
    }
    async finish(id, body) {
        let ariza = await this.arizaRepo.findOne({
            where: { id },
        });
        if (!ariza) {
            throw new common_1.NotFoundException("Ariza topilmadi");
        }
        if (ariza.status == "created") {
            ariza.response = body.response;
            ariza.response_type = body.response_type;
            ariza.status = "finished";
            return await this.arizaRepo.save(ariza);
        }
        else {
            if (ariza.status == "finished") {
                throw new common_1.BadRequestException("Ariza allaqachon tugatilgan");
            }
            else if (ariza.status == "canceled") {
                throw new common_1.BadRequestException("Ariza bekor qilingan");
            }
        }
    }
    async cancel(id, body) {
        let ariza = await this.arizaRepo.findOne({
            where: { id },
        });
        if (!ariza) {
            throw new common_1.NotFoundException("Ariza topilmadi");
        }
        if (ariza.status == "created") {
            ariza.response = body.response;
            ariza.response_type = body.response_type;
            ariza.status = "canceled";
            return await this.arizaRepo.save(ariza);
        }
        else {
            if (ariza.status == "finished") {
                throw new common_1.BadRequestException("Ariza allaqachon tugatilgan");
            }
            else if (ariza.status == "canceled") {
                throw new common_1.BadRequestException("Ariza bekor qilingan");
            }
        }
    }
    async create(body) {
        let ijrochi = await this.ijrochiRepo.findOne({
            where: {
                id: body.ijrochi_id,
            },
            relations: {
                arizalar: true
            }
        });
        if (!ijrochi) {
            throw new common_1.NotFoundException("Ijrochi topilmadi");
        }
        let NewAriza = this.arizaRepo.create(body);
        ijrochi.arizalar ??= [];
        ijrochi.arizalar.push(NewAriza);
        await this.ijrochiRepo.save(ijrochi);
        console.log("come >>>");
        ijrochi.arizalar = undefined;
        NewAriza.ijrochi = ijrochi;
        return await this.arizaRepo.save(NewAriza);
    }
    async baholash(id, baho) {
        let ariza = await this.arizaRepo.findOne({
            where: { id }
        });
        ariza.rate = baho;
        await this.arizaRepo.save(ariza);
    }
    async download(id, botService) {
        let ariza = await this.arizaRepo.findOne({
            where: { id }
        });
        console.log(ariza);
        let output = await botService.createPdf(ariza);
        const file = (0, fs_1.createReadStream)(output);
        return new common_1.StreamableFile(file, {
            type: 'application/pdf',
            disposition: `attachment; filename="ariza-${id}.json"`,
        });
    }
};
exports.ArizaService = ArizaService;
exports.ArizaService = ArizaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ariza_entity_1.ArizaEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(ijrochi_entity_1.IjrochiEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ArizaService);
//# sourceMappingURL=ariza.service.js.map