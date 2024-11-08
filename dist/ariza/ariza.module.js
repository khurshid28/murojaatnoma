"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArizaModule = void 0;
const common_1 = require("@nestjs/common");
const ariza_service_1 = require("./ariza.service");
const ariza_controller_1 = require("./ariza.controller");
const typeorm_1 = require("@nestjs/typeorm");
const ariza_entity_1 = require("./entity/ariza.entity");
const ijrochi_entity_1 = require("../ijrochi/entity/ijrochi.entity");
const bot_service_1 = require("../bot/bot.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
let ArizaModule = class ArizaModule {
};
exports.ArizaModule = ArizaModule;
exports.ArizaModule = ArizaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                ariza_entity_1.ArizaEntity, ijrochi_entity_1.IjrochiEntity
            ]),
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: './uploads',
                    filename: (req, file, cb) => {
                        const filename = `${Date.now()}-${file.originalname}`;
                        cb(null, filename);
                    },
                }),
            }),
        ],
        providers: [ariza_service_1.ArizaService, bot_service_1.BotService],
        controllers: [ariza_controller_1.ArizaController]
    })
], ArizaModule);
//# sourceMappingURL=ariza.module.js.map