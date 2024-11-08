import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BotService } from './bot/bot.service';
import { LinkModule } from './link/link.module';
import { ArizaModule } from './ariza/ariza.module';
import { IjrochiModule } from './ijrochi/ijrochi.module';
import * as path from "path"
import { ArizaService } from './ariza/ariza.service';
import { ArizaEntity } from './ariza/entity/ariza.entity';
import { BotModule } from './bot/bot.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
@Module({
  exports: [ConfigModule,],

  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  
  
    TypeOrmModule.forRootAsync(

      {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (config: any) => {
          return {
            type: config.get("DB_TYPE"),
            host: config.get("DB_HOST"),
            port: parseInt(config.get("DB_PORT")),
            username: config.get("DB_USER"),
            password: config.get("DB_PASSWORD"),
            database: config.get("DB_NAME"),
            entities: [path.join(__dirname, '**', 'entity', '*.entity.{ts,js}'),],
            synchronize: true,
            // logging: true,
            migrationsTableName: 'migration',
            insecureAuth: true,
            migrations: ['./migration/*.ts'],
            cli: {
              migrationsDir: './migration',
            },
            // ssl: config.get("MODE") == "DEV",
          }
        }
      }
    ),
    LinkModule,
    ArizaModule,
    IjrochiModule,

   
  ],
  controllers: [AppController],
  providers: [AppService,  ],
})
export class AppModule { }
