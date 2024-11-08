"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IjrochiModule = void 0;
const common_1 = require("@nestjs/common");
const ijrochi_service_1 = require("./ijrochi.service");
const ijrochi_controller_1 = require("./ijrochi.controller");
const ijrochi_entity_1 = require("./entity/ijrochi.entity");
const typeorm_1 = require("@nestjs/typeorm");
let IjrochiModule = class IjrochiModule {
};
exports.IjrochiModule = IjrochiModule;
exports.IjrochiModule = IjrochiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                ijrochi_entity_1.IjrochiEntity
            ])
        ],
        providers: [ijrochi_service_1.IjrochiService],
        controllers: [ijrochi_controller_1.IjrochiController]
    })
], IjrochiModule);
//# sourceMappingURL=ijrochi.module.js.map