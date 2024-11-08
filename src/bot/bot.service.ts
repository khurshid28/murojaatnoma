import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import * as TelegramBot from "node-telegram-bot-api"
import { ArizaService } from "src/ariza/ariza.service";
import { CancelArizaDto } from "src/ariza/dto/cancel-ariza.dto";
import { FinishArizaDto } from "src/ariza/dto/finish-ariza.dto";
import * as path from "path";

import * as fs from "fs";
import { ArizaEntity } from "src/ariza/entity/ariza.entity";
import *  as pdf from "pdf-creator-node";





@Injectable()
export class BotService implements OnModuleInit {
    constructor(@Inject() public config: ConfigService, @Inject() private readonly arizaService: ArizaService) {
        this.bot = new TelegramBot(config.get("BOT_TOKEN"), { polling: true });
    }
    public bot: TelegramBot

    onModuleInit() {
        this.botMessageListen();
        this.botcallbackListen();
    }
    public async sendRateMessage(id: number, chatId: string, body: FinishArizaDto,) {
        const options = {
            caption: `Ariza raqami: ${id}\nBaholang 😊`,
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            "value": 1,
                            "smile": "☹️"
                        },
                        {
                            "value": 2,
                            "smile": "🙁"
                        },
                        {
                            "value": 3,
                            "smile": "😐"
                        },
                        {
                            "value": 4,
                            "smile": "😊"
                        },
                        {
                            "value": 5,
                            "smile": "☺️"
                        }


                    ].map((item, index) => {
                        return { text: `${item.value} ${item.smile}`, callback_data: `baho-${item.value}-${id}` }
                    }),

                ]
            }
        };
        if (body.response_type == "text") {
            await this.bot.sendMessage(chatId, "Ijrochi: \n" + body.response+`\n\nAriza raqami: ${id}\nBaholang 😊`,options);
        } else {
            let filepath = path.join(__dirname, "..", "..", body.response)
            console.log(filepath);
            let filedata = fs.createReadStream(filepath,);

            await this.bot.sendDocument(chatId, filedata,options);

        }
       

        // await this.bot.sendMessage(chatId, `Ariza raqami: ${id}\nBaholang 😊`, options);
    }

    public async sendCancelMessage(id: number, chatId: string, body: CancelArizaDto,) {
        var option = {
            caption : `Ariza raqami: ${id}\nAfsuski ariza bekor qilindi 😓`,
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            "value": 1,
                            "smile": "☹️"
                        },
                        {
                            "value": 2,
                            "smile": "🙁"
                        },
                        {
                            "value": 3,
                            "smile": "😐"
                        },
                        {
                            "value": 4,
                            "smile": "😊"
                        },
                        {
                            "value": 5,
                            "smile": "☺️"
                        }


                    ].map((item, index) => {
                        return { text: `${item.value} ${item.smile}`, callback_data: `baho-${item.value}-${id}` }
                    }),

                ]
            }
        }
      
       
        if (body.response_type == "text") {
            await this.bot.sendMessage(chatId, "Ijrochi: \n" + body.response + `\n\nAriza raqami: ${id}\nAfsuski ariza bekor qilindi 😓`,option);
        } else {
            let filepath = path.join(__dirname, "..", "..", body.response)
            console.log(filepath);
            let filedata = fs.createReadStream(filepath,);
            await this.bot.sendDocument(chatId, filedata,option);

        }

    }
    public  ddmmYYY(date : Date) {
        var mm = date.getMonth() + 1; // getMonth() is zero-based
        var dd = date.getDate();
    
        return [
          date.getFullYear(),
          (mm > 9 ? "" : "0") + mm,
          (dd > 9 ? "" : "0") + dd,
        ]
          .reverse()
          .join(".");
      }

    public async createArizaMessage(ariza: ArizaEntity) {
        const opts = {
            caption :`F.I.O: ${ariza.fullname}\nSana: ${this.ddmmYYY( new Date())}`,
            reply_markup: {
                resize_keyboard: true,
                inline_keyboard: [[{
                    text: "Yakunlash / bekor qilish",
                    web_app: {
                        // url: this.config.get("FINISH_URL")
                        url: this.config.get("FINISH_URL") + "?ariza_id=" + `${ariza.id}`
                    }
                }]]
            }
        };
        // console.log(this.config.get("WEB_LINK") + "?ariza_id=" + ariza.id);
        let outputPath = await this.createPdf(ariza);
        console.log(outputPath);

        await this.bot.sendDocument(ariza.ijrochi.chat_id, outputPath,opts);
        // await this.bot.sendMessage(ariza.ijrochi.chat_id, `Ariza raqami: ${ariza.id}\nF.I.O: ${ariza.fullname}`, opts);
    }
    botMessageListen() {
        console.log("Bot service started");

        this.bot.on('message', (msg) => {

            try {
                if (msg.text == "/start") {
                    const opts = {
                        reply_markup: {
                            resize_keyboard: true,
                            inline_keyboard: [[{
                                text: "Murojaat qilish",
                                web_app: {
                                    url: this.config.get("WEB_LINK") + `?chat_id=${msg.from.id}`
                                }
                            }]]
                        }
                    };
                    console.log(this.config.get("WEB_LINK") + `?chat_id=${msg.from.id}`);
                    
                    this.bot.sendMessage(msg.from.id, "Assalomu alaykum 😊, " + (msg.from.first_name ?? "") + " " + (msg.from.last_name ?? "") + "\nMurojaat qilish uchun tugmani bosing.", opts);

                }

            } catch (error) {
                this.bot.sendMessage(msg.from.id, "Serverda muommo sodir bo'ldi");
            }


        });

    }

    botcallbackListen() {
        this.bot.on('callback_query', async (query) => {
            const chatId = query.message.chat.id;
            let data: string = query.data;

            if (data.includes("baho")) {
                let baho = data.split("-")[1];
                let ariza_id = data.split("-")[2];
                let ariza = await this.arizaService.getOne(parseInt(ariza_id));
                if (ariza.rate) {
                    this.bot.sendMessage(chatId, 'Baholash operatsiyasi bajarilgan ⚠️');
                    return;
                }
                await this.arizaService.baholash(parseInt(ariza_id,), baho);
                this.bot.sendMessage(chatId, 'Baholaganizdan minnatdormiz 😊');

            }

        });
    }

    async createPdf(ariza: ArizaEntity) {
        var options = {
            format: "A4",
            orientation: "portrait",
            border: "10mm",
            // header: {
            //     height: "45mm",
            //     contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
            // },
            // footer: {
            //     height: "28mm",
            //     contents: {
            //         first: 'Cover page',
            //         2: 'Second page', // Any page number is working. 1-based index
            //         default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            //         last: 'Last Page'
            //     }
            // }
        };
        var htmlPath = path.join(__dirname, "..", "..", "template", "ariza.html")
        var html = fs.readFileSync(htmlPath, "utf8");
        var outputPath = path.join(__dirname, "..", "..", "output", `ariza-${ariza.id}.pdf`);

        let doc = {
            html,
            
            data: {
                ...ariza,
                createAt  : this.ddmmYYY( new Date()),
                ijrochi : ariza.ijrochi.fullname
            },
            path: outputPath
        }
        await pdf
            .create(doc, options)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.error(error);
                throw error;
            });
        return outputPath;
    }
}