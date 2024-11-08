import { ConfigService } from '@nestjs/config';
export declare class LinkController {
    config: ConfigService;
    constructor(config: ConfigService);
    redirectToBotLink(res: any): any;
}
