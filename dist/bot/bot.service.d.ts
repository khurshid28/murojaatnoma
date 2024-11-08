import { OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as TelegramBot from "node-telegram-bot-api";
import { ArizaService } from "src/ariza/ariza.service";
import { CancelArizaDto } from "src/ariza/dto/cancel-ariza.dto";
import { FinishArizaDto } from "src/ariza/dto/finish-ariza.dto";
import { ArizaEntity } from "src/ariza/entity/ariza.entity";
export declare class BotService implements OnModuleInit {
    config: ConfigService;
    private readonly arizaService;
    constructor(config: ConfigService, arizaService: ArizaService);
    bot: TelegramBot;
    onModuleInit(): void;
    sendRateMessage(id: number, chatId: string, body: FinishArizaDto): Promise<void>;
    sendCancelMessage(id: number, chatId: string, body: CancelArizaDto): Promise<void>;
    ddmmYYY(date: Date): string;
    createArizaMessage(ariza: ArizaEntity): Promise<void>;
    botMessageListen(): void;
    botcallbackListen(): void;
    createPdf(ariza: ArizaEntity): Promise<string>;
}
