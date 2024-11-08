import { Repository } from 'typeorm';
import { IjrochiEntity } from './entity/ijrochi.entity';
import { CreateIjrochiDto } from './dto/create-ijrochi.dto';
export declare class IjrochiService {
    private readonly ijrochiRepo;
    constructor(ijrochiRepo: Repository<IjrochiEntity>);
    getOne(id: number, arizalar: string): Promise<IjrochiEntity>;
    create(body: CreateIjrochiDto): Promise<IjrochiEntity>;
    getAll(): Promise<IjrochiEntity[]>;
}
