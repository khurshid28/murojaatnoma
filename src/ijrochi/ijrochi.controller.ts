
import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, ParseBoolPipe, Post, Put, Query } from '@nestjs/common';
import { IjrochiService } from './ijrochi.service';
import { CreateIjrochiDto } from './dto/create-ijrochi.dto';


@Controller('ijrochi')
export class IjrochiController {

    constructor(@Inject() private readonly ijrochiService: IjrochiService) { }


    @Get('/all')
    @HttpCode(HttpStatus.OK)
    async getAll() {
        return await this.ijrochiService.getAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getOne(@Param("id") id: number, @Query("arizalar",) arizalar: string) {
        return await this.ijrochiService.getOne(id, arizalar);
    }


    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() body: CreateIjrochiDto) {
        return await this.ijrochiService.create(body);
    }

}
