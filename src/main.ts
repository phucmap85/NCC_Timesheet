import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { BaseExceptionFilter } from 'src/utils/base-exception.filter';
import { BaseResponseInterceptor } from 'src/utils/base-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  
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
  
  await app.listen(process.env.PORT ?? 21023);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
