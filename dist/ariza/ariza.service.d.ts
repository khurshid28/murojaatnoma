import { ArizaEntity } from './entity/ariza.entity';
import { Repository } from 'typeorm';
import { CreateArizaDto } from './dto/create-ariza.dto';
import { IjrochiEntity } from 'src/ijrochi/entity/ijrochi.entity';
import { FinishArizaDto } from './dto/finish-ariza.dto';
export declare class ArizaService {
    private readonly arizaRepo;
    private readonly ijrochiRepo;
    constructor(arizaRepo: Repository<ArizaEntity>, ijrochiRepo: Repository<IjrochiEntity>);
    getAll(): Promise<ArizaEntity[]>;
    getOne(id: number): Promise<ArizaEntity>;
    finish(id: number, body: FinishArizaDto): Promise<ArizaEntity>;
    cancel(id: number, body: FinishArizaDto): Promise<ArizaEntity>;
    create(body: CreateArizaDto): Promise<ArizaEntity>;
    baholash(id: number, baho: string): Promise<void>;
}
