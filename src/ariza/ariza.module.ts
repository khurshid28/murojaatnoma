import { Module } from '@nestjs/common';
import { ArizaService } from './ariza.service';
import { ArizaController } from './ariza.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArizaEntity } from './entity/ariza.entity';
import { IjrochiEntity } from 'src/ijrochi/entity/ijrochi.entity';
import { BotService } from 'src/bot/bot.service';
import { BotModule } from 'src/bot/bot.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        ArizaEntity, IjrochiEntity
      ]
    ),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  ],
  providers: [ArizaService,BotService],
  controllers: [ArizaController]
})
export class ArizaModule { }
