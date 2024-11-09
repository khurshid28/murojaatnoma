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
exports.IjrochiService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ijrochi_entity_1 = require("./entity/ijrochi.entity");
let IjrochiService = class IjrochiService {
    constructor(ijrochiRepo) {
        this.ijrochiRepo = ijrochiRepo;
    }
    async getOne(id, arizalar) {
        let ijrochi = await this.ijrochiRepo.findOne({
            where: { id },
            relations: {
                arizalar: arizalar == "true"
            }
        });
        if (!ijrochi) {
            throw new common_1.NotFoundException("Ijrochi topilmadi");
        }
        return ijrochi;
    }
    async create(body) {
        let NewIjrochi = this.ijrochiRepo.create(body);
        return await this.ijrochiRepo.save(NewIjrochi);
    }
    async getAll() {
        let ijrochilar = await this.ijrochiRepo.find();
        return ijrochilar;
    }
    async delete(id) {
        let ijrochi = await this.ijrochiRepo.delete({
            id
        });
        if (!ijrochi) {
            throw new common_1.NotFoundException("Ijrochi topilmadi");
        }
    }
};
exports.IjrochiService = IjrochiService;
exports.IjrochiService = IjrochiService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ijrochi_entity_1.IjrochiEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], IjrochiService);
//# sourceMappingURL=ijrochi.service.js.map