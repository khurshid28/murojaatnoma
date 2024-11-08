import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArizaController } from 'src/ariza/ariza.controller';
import { ArizaService } from 'src/ariza/ariza.service';
import { ArizaEntity } from 'src/ariza/entity/ariza.entity';
import { IjrochiEntity } from 'src/ijrochi/entity/ijrochi.entity';
import { BotService } from './bot.service';

@Module({
    imports: [TypeOrmModule.forFeature(
        [
            ArizaEntity, IjrochiEntity
        ]
    )
    ],
    providers: [ArizaService, BotService],
    controllers: [ArizaController]
})
export class BotModule { }
