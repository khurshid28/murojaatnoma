import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post, Put, Query, Res, UploadedFile, UseInterceptors,Response, StreamableFile } from '@nestjs/common';
import { ArizaService } from './ariza.service';
import { CreateArizaDto } from './dto/create-ariza.dto';
import { BotService } from 'src/bot/bot.service';
import { FinishArizaDto } from './dto/finish-ariza.dto';
import { CancelArizaDto } from './dto/cancel-ariza.dto';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('ariza')
export class ArizaController {
    constructor(@Inject() private readonly arizaService: ArizaService, @Inject() private botService: BotService) { }



    @Get('/all')
    @HttpCode(HttpStatus.OK)
    async getAll() {
        return await this.arizaService.getAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getOne(@Param("id") id: number,) {
        return await this.arizaService.getOne(id,);
    }


    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() body: CreateArizaDto) {
        console.log(body);
        
        let ariza =  await this.arizaService.create(body);
        this.botService.createArizaMessage(ariza);
        return ariza;
        

    }

    @Put('/finish/:id')
    @UseInterceptors(FileInterceptor('response'))
    @HttpCode(HttpStatus.OK)
    async finish(@Param("id") id: number, @Body() body: FinishArizaDto, @UploadedFile() response: Express.Multer.File) {
        console.log(response);
       
        if (body.response_type == "document" || body.response_type == "image" ) {
            body.response = response.path;
        }
        let ariza = await this.arizaService.finish(id, body);
        this.botService.sendRateMessage(id, ariza.chat_id, body);
        return ariza;
    }

    @Put('/cancel/:id')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(FileInterceptor('response'))
    async cancel(@Param("id") id: number, @Body() body: CancelArizaDto, @UploadedFile() response: Express.Multer.File) {
        let ariza = await this.arizaService.cancel(id, body);

        // let ariza = await this.arizaService.getOne(id,);
        if (body.response_type == "document" || body.response_type == "image" ) {
            body.response = response.path;
        }
        this.botService.sendCancelMessage(id, ariza.chat_id, body,);
        return ariza;
    }


    @Get('/:id/download')
    @HttpCode(HttpStatus.OK)
    
    async download(@Param("id") id,@Res() res: Response) {
        return await this.arizaService.download(id,this.botService);
    }



}
