
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IjrochiEntity } from './entity/ijrochi.entity';
import { CreateIjrochiDto } from './dto/create-ijrochi.dto';


@Injectable()
export class IjrochiService {

    constructor(@InjectRepository(IjrochiEntity) private readonly ijrochiRepo: Repository<IjrochiEntity>) { }


    async getOne(id: number, arizalar: string) {
        let ijrochi = await this.ijrochiRepo.findOne({
            where: { id },
            relations: {
                arizalar: arizalar == "true"
            }
        });

        if (!ijrochi) {
            throw new NotFoundException("Ijrochi topilmadi");
        }
        return ijrochi;

    }

    async create(body: CreateIjrochiDto) {
        let NewIjrochi = this.ijrochiRepo.create(body);
        return await this.ijrochiRepo.save(NewIjrochi);

    }

    async getAll() {
        let ijrochilar = await this.ijrochiRepo.find(
        );
        return ijrochilar;

    }


}
