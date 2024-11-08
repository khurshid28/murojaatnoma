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
exports.IjrochiEntity = void 0;
const ariza_entity_1 = require("../../ariza/entity/ariza.entity");
const typeorm_1 = require("typeorm");
let IjrochiEntity = class IjrochiEntity {
};
exports.IjrochiEntity = IjrochiEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], IjrochiEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', }),
    __metadata("design:type", String)
], IjrochiEntity.prototype, "nomi", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', }),
    __metadata("design:type", String)
], IjrochiEntity.prototype, "fullname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], IjrochiEntity.prototype, "chat_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ariza_entity_1.ArizaEntity, (ariza) => ariza.ijrochi),
    __metadata("design:type", Array)
], IjrochiEntity.prototype, "arizalar", void 0);
exports.IjrochiEntity = IjrochiEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'ijrochi' })
], IjrochiEntity);
//# sourceMappingURL=ijrochi.entity.js.map