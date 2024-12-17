import { StreamableFile } from '@nestjs/common';
import { ArizaService } from './ariza.service';
import { CreateArizaDto } from './dto/create-ariza.dto';
import { BotService } from 'src/bot/bot.service';
import { FinishArizaDto } from './dto/finish-ariza.dto';
import { CancelArizaDto } from './dto/cancel-ariza.dto';
export declare class ArizaController {
    private readonly arizaService;
    private botService;
    constructor(arizaService: ArizaService, botService: BotService);
    getAll(): Promise<import("./entity/ariza.entity").ArizaEntity[]>;
    getOne(id: number): Promise<import("./entity/ariza.entity").ArizaEntity>;
    create(body: CreateArizaDto): Promise<import("./entity/ariza.entity").ArizaEntity>;
    finish(id: number, body: FinishArizaDto, response: Express.Multer.File): Promise<import("./entity/ariza.entity").ArizaEntity>;
    cancel(id: number, body: CancelArizaDto, response: Express.Multer.File): Promise<import("./entity/ariza.entity").ArizaEntity>;
    download(id: any, res: Response): Promise<StreamableFile>;
}
