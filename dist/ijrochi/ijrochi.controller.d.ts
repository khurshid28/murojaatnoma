import { IjrochiService } from './ijrochi.service';
import { CreateIjrochiDto } from './dto/create-ijrochi.dto';
export declare class IjrochiController {
    private readonly ijrochiService;
    constructor(ijrochiService: IjrochiService);
    getAll(): Promise<import("./entity/ijrochi.entity").IjrochiEntity[]>;
    getOne(id: number, arizalar: string): Promise<import("./entity/ijrochi.entity").IjrochiEntity>;
    create(body: CreateIjrochiDto): Promise<import("./entity/ijrochi.entity").IjrochiEntity>;
    delete(id: number): Promise<void>;
}
