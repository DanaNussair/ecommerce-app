import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ProductModule } from './product.module';
import { Transport } from '@nestjs/microservices';
import { PRODUCT_PACKAGE_NAME } from '@app/common';
import { join } from 'path';
import { AllExceptionsFilter } from 'apps/main/src/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(ProductModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.enableCors({
    origin: 'http://localhost:3000',
  });

  await app.listen(3002);

  // Create gRPC Microservice
  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: PRODUCT_PACKAGE_NAME,
      protoPath: join(__dirname, '../product.proto'),
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
