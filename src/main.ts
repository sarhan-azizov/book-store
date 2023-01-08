import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';
import { DOTENV, middleware, swagger } from './configs';

(async function () {
  const app = await NestFactory.create(AppModule);

  middleware(app);
  swagger(app);

  await app.listen(DOTENV.app.port);

  Logger.log(app.getUrl(), 'Book Store Service started!');
})();
