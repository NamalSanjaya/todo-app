import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({origin: "*",  exposedHeaders: ['Authorization', 'Content-Type'], 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]});
  await app.listen(8000);
}
bootstrap();
// username: admin
// password: admin