import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as bodyParser from 'body-parser';
import * as multer from 'multer';

import * as morgan from "morgan"

import * as fs from "fs"

async function bootstrap() {
  let httpsOptions = {
    key : fs.readFileSync("../secrets/cert.key"),
    cert : fs.readFileSync("../secrets/cert.crt"),
  }
  const app = await NestFactory.create(AppModule,{httpsOptions,cors : true});
 
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms')
  )

  app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }))
  app.use(bodyParser.text({ type: 'text/html' }))
  app.use(bodyParser.json({
    limit: "10mb"
  }))
  await app.listen(process.env.PORT || 3000);


}
bootstrap();
