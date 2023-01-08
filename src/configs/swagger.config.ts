import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function swagger(app: INestApplication): INestApplication | null {
  const config = new DocumentBuilder()
    .setTitle('OpenAPI Documentation')
    .setDescription('Book store API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  return app;
}
