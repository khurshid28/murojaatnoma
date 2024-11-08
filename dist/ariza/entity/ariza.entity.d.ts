import { IjrochiEntity } from 'src/ijrochi/entity/ijrochi.entity';
export declare class ArizaEntity {
    id: number;
    chat_id: string;
    ijrochi_id: number;
    ijrochi: IjrochiEntity;
    fullname: string;
    phone1: string;
    phone2: string;
    address: string;
    desc: string;
    status: string;
    createAt: Date;
    response_type: string;
    response: string;
    rate: string;
}
