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
exports.ArizaEntity = void 0;
const ijrochi_entity_1 = require("../../ijrochi/entity/ijrochi.entity");
const typeorm_1 = require("typeorm");
let ArizaEntity = class ArizaEntity {
};
exports.ArizaEntity = ArizaEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], ArizaEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ArizaEntity.prototype, "chat_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ArizaEntity.prototype, "ijrochi_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ijrochi_entity_1.IjrochiEntity, (ijrochi) => ijrochi.arizalar),
    __metadata("design:type", ijrochi_entity_1.IjrochiEntity)
], ArizaEntity.prototype, "ijrochi", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', }),
    __metadata("design:type", String)
], ArizaEntity.prototype, "fullname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 13 }),
    __metadata("design:type", String)
], ArizaEntity.prototype, "phone1", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 13 }),
    __metadata("design:type", String)
], ArizaEntity.prototype, "phone2", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', }),
    __metadata("design:type", String)
], ArizaEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', }),
    __metadata("design:type", String)
], ArizaEntity.prototype, "desc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: "created" }),
    __metadata("design:type", String)
], ArizaEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' }),
    __metadata("design:type", Date)
], ArizaEntity.prototype, "createAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: "text" }),
    __metadata("design:type", String)
], ArizaEntity.prototype, "response_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: "" }),
    __metadata("design:type", String)
], ArizaEntity.prototype, "response", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], ArizaEntity.prototype, "rate", void 0);
exports.ArizaEntity = ArizaEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'ariza' })
], ArizaEntity);
//# sourceMappingURL=ariza.entity.js.map