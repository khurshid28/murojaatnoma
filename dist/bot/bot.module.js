"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ariza_controller_1 = require("../ariza/ariza.controller");
const ariza_service_1 = require("../ariza/ariza.service");
const ariza_entity_1 = require("../ariza/entity/ariza.entity");
const ijrochi_entity_1 = require("../ijrochi/entity/ijrochi.entity");
const bot_service_1 = require("./bot.service");
let BotModule = class BotModule {
};
exports.BotModule = BotModule;
exports.BotModule = BotModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([
                ariza_entity_1.ArizaEntity, ijrochi_entity_1.IjrochiEntity
            ])
        ],
        providers: [ariza_service_1.ArizaService, bot_service_1.BotService],
        controllers: [ariza_controller_1.ArizaController]
    })
], BotModule);
//# sourceMappingURL=bot.module.js.map