import { Controller, Get, Inject, Redirect, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('link')
export class LinkController {
    constructor(@Inject() public config :  ConfigService){}
    @Get('MirzoUlugbekMurojaatnomaBot')
    
    redirectToBotLink(@Res() res) {
        console.log('redirectToBotLink!');
        return res.redirect(this.config.get("BOT_LINK"));
    }
}
