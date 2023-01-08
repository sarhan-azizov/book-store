import { INestApplication } from '@nestjs/common';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';

export function middleware(app: INestApplication): INestApplication {
  app.use(compression());
  app.use(cookieParser());

  return app;
}
