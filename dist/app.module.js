"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const link_module_1 = require("./link/link.module");
const ariza_module_1 = require("./ariza/ariza.module");
const ijrochi_module_1 = require("./ijrochi/ijrochi.module");
const path = require("path");
const auth_controller_1 = require("./auth/auth.controller");
const auth_module_1 = require("./auth/auth.module");
const jwt_1 = require("@nestjs/jwt");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        exports: [config_1.ConfigModule,],
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (config) => {
                    return {
                        type: config.get("DB_TYPE"),
                        host: process.env.DB_HOST,
                        port: parseInt(process.env.DB_PORT),
                        username: process.env.DB_USER,
                        password: process.env.DB_PASSWORD,
                        database: process.env.DB_NAME,
                        entities: [path.join(__dirname, '**', 'entity', '*.entity.{ts,js}'),],
                        synchronize: true,
                        migrationsTableName: 'migration',
                        insecureAuth: true,
                        migrations: ['./migration/*.ts'],
                        cli: {
                            migrationsDir: './migration',
                        },
                    };
                }
            }),
            link_module_1.LinkModule,
            ariza_module_1.ArizaModule,
            ijrochi_module_1.IjrochiModule,
            auth_module_1.AuthModule,
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '365d' },
            }),
        ],
        controllers: [app_controller_1.AppController, auth_controller_1.AuthController],
        providers: [app_service_1.AppService,],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map