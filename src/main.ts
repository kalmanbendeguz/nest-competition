import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { logger } from './common/middleware/loggerFunction.middleware';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { InheritedAllExceptionsFilter } from './common/filters/inherited-all-exceptions.filter';

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
      { abortOnError: false },
    );
    app.use(logger);

    app.useGlobalFilters(new HttpExceptionFilter());

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new InheritedAllExceptionsFilter(httpAdapter));

    await app.listen(3000);
  } catch (error) {
    console.error(error);
  }
}
bootstrap();
