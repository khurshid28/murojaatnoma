import { BadRequestException, Inject, Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArizaEntity } from './entity/ariza.entity';
import { Repository } from 'typeorm';
import { CreateArizaDto } from './dto/create-ariza.dto';
import { IjrochiEntity } from 'src/ijrochi/entity/ijrochi.entity';
import { BotService } from 'src/bot/bot.service';
import { FinishArizaDto } from './dto/finish-ariza.dto';
import { createReadStream } from 'fs';

@Injectable()
export class ArizaService {

    constructor(@InjectRepository(ArizaEntity) private readonly arizaRepo: Repository<ArizaEntity>,

        @InjectRepository(IjrochiEntity) private readonly ijrochiRepo: Repository<IjrochiEntity>,
        



    ) { }


    async getAll() {
        let ariza =

            await this.arizaRepo.find(
                {
                    relations: {
                        ijrochi: true
                    }
                }
            );
        return ariza;

    }


    async getOne(id: number,) {
        let ariza =

            await this.arizaRepo.findOne({
                where: { id },
                relations: { ijrochi: true }
            });

        if (!ariza) {
            throw new NotFoundException("Ariza topilmadi");
        }
        return ariza;

    }

    async finish(id: number, body: FinishArizaDto) {
        let ariza = 
            await this.arizaRepo.findOne({
                where: { id },
            });
        
        if (!ariza) {
            throw new NotFoundException("Ariza topilmadi");
        }
        if (ariza.status == "created") {
            ariza.response = body.response;
            ariza.response_type = body.response_type;
            ariza.status ="finished";

            return await this.arizaRepo.save(ariza);
        } else {
            if (ariza.status =="finished") {
                throw new BadRequestException("Ariza allaqachon tugatilgan");
            }else if(ariza.status =="canceled"){
                throw new BadRequestException("Ariza bekor qilingan");
            }
        }


    }

    async cancel(id: number, body: FinishArizaDto) {
        let ariza = 
            await this.arizaRepo.findOne({
                where: { id },
            });
        
        if (!ariza) {
            throw new NotFoundException("Ariza topilmadi");
        }
        if (ariza.status == "created") {
            ariza.response = body.response;
            ariza.response_type = body.response_type;
            ariza.status ="canceled";

            return await this.arizaRepo.save(ariza);
        } else {
            if (ariza.status =="finished") {
                throw new BadRequestException("Ariza allaqachon tugatilgan");
            }else if(ariza.status =="canceled"){
                throw new BadRequestException("Ariza bekor qilingan");
            }
        }


    }

    async create(body: CreateArizaDto) {
        let ijrochi = await this.ijrochiRepo.findOne({
            where: {
                id: body.ijrochi_id,

            },
            relations: {
                arizalar: true
            }
        });
        if (!ijrochi) {
            throw new NotFoundException("Ijrochi topilmadi");
        }
        let NewAriza = this.arizaRepo.create(body);

        ijrochi.arizalar ??= []
        ijrochi.arizalar.push(NewAriza)

        await this.ijrochiRepo.save(ijrochi);

        console.log("come >>>");
        ijrochi.arizalar = undefined

        NewAriza.ijrochi = ijrochi;
        return await this.arizaRepo.save(NewAriza);

    }

    async baholash(id: number, baho: string) {
        let ariza = await this.arizaRepo.findOne({
            where: { id }
        });

        ariza.rate = baho;

        await this.arizaRepo.save(ariza);

    }


    async download(id:number,botService :BotService){
        let ariza = await this.arizaRepo.findOne({
            where: { id }
        });
        console.log(ariza);
        
        let output = await botService.createPdf(ariza)
        const file = createReadStream(output);
        return new StreamableFile(file, {
            type: 'application/pdf',
            disposition: `attachment; filename="ariza-${id}.json"`,
            
          });
    }



}
