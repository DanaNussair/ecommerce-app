import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';
import { AllExceptionsFilter } from 'apps/main/src/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(OrderModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.enableCors({
    origin: 'http://localhost:3000',
  });

  await app.listen(3003);
}
bootstrap();
