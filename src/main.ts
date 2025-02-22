import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as bodyParser from 'body-parser';
import * as multer from 'multer';

import * as morgan from 'morgan';

import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  // console.log(path.join(__dirname,"..","secrects","privkey.pem"));
  
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: true,
    },
    // httpsOptions: {
    // //   rejectUnauthorized: false,
    // // requestCert: true,
      

    //   // key: fs.readFileSync(path.join(__dirname,"..","secrets","privkey.pem")),
    //   // cert: fs.readFileSync(path.join(__dirname,"..","secrets","cert.pem")),

    // //   key: fs.readFileSync(path.join(__dirname,"..","test_secrets",'server-key.pem') ),
    // //  cert: fs.readFileSync(path.join(__dirname,"..","test_secrets",'server-cert.pem')),
    // //  ca : fs.readFileSync(path.join(__dirname,"..","test_secrets",'server-csr.pem')),


    // //   key: fs.readFileSync(path.join(__dirname,"..","test3",'key.pem') ),
    // //  cert: fs.readFileSync(path.join(__dirname,"..","test3",'cert.pem')),

    // // key: fs.readFileSync(path.join(__dirname,"..","test2",'key1.pem') ),
    // // cert: fs.readFileSync(path.join(__dirname,"..","test2",'cert1.pem'))
    // },
  });

  // app.use(function (req, res, next) {
  //   //Enabling CORS
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header(
  //     'Access-Control-Allow-Methods',
  //     'GET,HEAD,OPTIONS,POST,PUT,DELETE',
  //   );
  //   res.header(
  //     'Access-Control-Allow-Headers',
  //     'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization',
  //   );
  //   next();
  // });

  app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms'),
  );

  app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
  app.use(bodyParser.text({ type: 'text/html' }));
  app.use(
    bodyParser.json({
      limit: '10mb',
    }),
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
