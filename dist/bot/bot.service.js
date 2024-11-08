"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const TelegramBot = require("node-telegram-bot-api");
const ariza_service_1 = require("../ariza/ariza.service");
const path = require("path");
const fs = require("fs");
const pdf = require("pdf-creator-node");
let BotService = class BotService {
    constructor(config, arizaService) {
        this.config = config;
        this.arizaService = arizaService;
        this.bot = new TelegramBot(config.get("BOT_TOKEN"), { polling: true });
    }
    onModuleInit() {
        this.botMessageListen();
        this.botcallbackListen();
    }
    async sendRateMessage(id, chatId, body) {
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
                        return { text: `${item.value} ${item.smile}`, callback_data: `baho-${item.value}-${id}` };
                    }),
                ]
            }
        };
        if (body.response_type == "text") {
            await this.bot.sendMessage(chatId, "Ijrochi: \n" + body.response + `\n\nAriza raqami: ${id}\nBaholang 😊`, options);
        }
        else {
            let filepath = path.join(__dirname, "..", "..", body.response);
            console.log(filepath);
            let filedata = fs.createReadStream(filepath);
            await this.bot.sendDocument(chatId, filedata, options);
        }
    }
    async sendCancelMessage(id, chatId, body) {
        var option = {
            caption: `Ariza raqami: ${id}\nAfsuski ariza bekor qilindi 😓`,
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
                        return { text: `${item.value} ${item.smile}`, callback_data: `baho-${item.value}-${id}` };
                    }),
                ]
            }
        };
        if (body.response_type == "text") {
            await this.bot.sendMessage(chatId, "Ijrochi: \n" + body.response + `\n\nAriza raqami: ${id}\nAfsuski ariza bekor qilindi 😓`, option);
        }
        else {
            let filepath = path.join(__dirname, "..", "..", body.response);
            console.log(filepath);
            let filedata = fs.createReadStream(filepath);
            await this.bot.sendDocument(chatId, filedata, option);
        }
    }
    ddmmYYY(date) {
        var mm = date.getMonth() + 1;
        var dd = date.getDate();
        return [
            date.getFullYear(),
            (mm > 9 ? "" : "0") + mm,
            (dd > 9 ? "" : "0") + dd,
        ]
            .reverse()
            .join(".");
    }
    async createArizaMessage(ariza) {
        const opts = {
            caption: `F.I.O: ${ariza.fullname}\nSana: ${this.ddmmYYY(new Date())}`,
            reply_markup: {
                resize_keyboard: true,
                inline_keyboard: [[{
                            text: "Yakunlash / bekor qilish",
                            web_app: {
                                url: this.config.get("WEB_LINK") + "?ariza_id=" + ariza.id
                            }
                        }]]
            }
        };
        let outputPath = await this.createPdf(ariza);
        console.log(outputPath);
        await this.bot.sendDocument(ariza.ijrochi.chat_id, outputPath, opts);
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
                    this.bot.sendMessage(msg.from.id, "Assalomu alaykum 😊, " + (msg.from.first_name ?? "") + " " + (msg.from.last_name ?? "") + "\nMurojaat qilish uchun tugmani bosing.", opts);
                }
            }
            catch (error) {
                this.bot.sendMessage(msg.from.id, "Serverda muommo sodir bo'ldi");
            }
        });
    }
    botcallbackListen() {
        this.bot.on('callback_query', async (query) => {
            const chatId = query.message.chat.id;
            let data = query.data;
            if (data.includes("baho")) {
                let baho = data.split("-")[1];
                let ariza_id = data.split("-")[2];
                let ariza = await this.arizaService.getOne(parseInt(ariza_id));
                if (ariza.rate) {
                    this.bot.sendMessage(chatId, 'Baholash operatsiyasi bajarilgan ⚠️');
                    return;
                }
                await this.arizaService.baholash(parseInt(ariza_id), baho);
                this.bot.sendMessage(chatId, 'Baholaganizdan minnatdormiz 😊');
            }
        });
    }
    async createPdf(ariza) {
        var options = {
            format: "A4",
            orientation: "portrait",
            border: "10mm",
        };
        var htmlPath = path.join(__dirname, "..", "..", "template", "ariza.html");
        var html = fs.readFileSync(htmlPath, "utf8");
        var outputPath = path.join(__dirname, "..", "..", "output", `ariza-${ariza.id}.pdf`);
        let doc = {
            html,
            data: {
                ...ariza,
                createAt: this.ddmmYYY(new Date()),
                ijrochi: ariza.ijrochi.fullname
            },
            path: outputPath
        };
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
};
exports.BotService = BotService;
exports.BotService = BotService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)()),
    __param(1, (0, common_1.Inject)()),
    __metadata("design:paramtypes", [config_1.ConfigService, ariza_service_1.ArizaService])
], BotService);
//# sourceMappingURL=bot.service.js.map