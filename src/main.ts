import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from 'src/app.module';
import { BaseExceptionFilter } from 'src/common/utils/base-exception.filter';
import { BaseResponseInterceptor } from 'src/common/utils/base-response.interceptor';

export let app: INestApplication;

async function bootstrap() {
  app = await NestFactory.create(AppModule, { cors: true });
  
  // Set global prefix for API routes
  app.setGlobalPrefix('api/services/app', { 
    exclude: ['AbpUserConfiguration/GetAll', 'api/TokenAuth/Authenticate']
  });
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }));
  app.useGlobalInterceptors(new BaseResponseInterceptor());
  app.useGlobalFilters(new BaseExceptionFilter());

  // Swagger setup
  const config = new DocumentBuilder().setTitle('Timesheet API').build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);
  
  await app.listen(process.env.PORT ?? 21023);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
