import { ValidationPipe, INestApplication } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import { JwtService } from '@nestjs/jwt';

import { GlobalExceptionFilter, AuthGuard } from '../common';

export function middleware(app: INestApplication): INestApplication {
  const reflector = app.get(Reflector);

  app.use(compression());
  app.use(cookieParser());

  app.useGlobalGuards(new AuthGuard(reflector, new JwtService()));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
    }),
  );

  app.useGlobalFilters(new GlobalExceptionFilter());

  return app;
}
