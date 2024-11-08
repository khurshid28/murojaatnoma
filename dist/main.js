"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const bodyParser = require("body-parser");
const morgan = require("morgan");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {});
    app.enableCors();
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
    app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
    app.use(bodyParser.text({ type: 'text/html' }));
    app.use(bodyParser.json({
        limit: "10mb"
    }));
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map