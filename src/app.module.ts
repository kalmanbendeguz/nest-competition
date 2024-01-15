import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ProductController } from './product/product.controller';
import { logger as LoggerFunctionMiddleware } from './common/middleware/loggerFunction.middleware';

@Module({
  imports: [ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  /*(can be async)*/ configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, LoggerFunctionMiddleware)
      .exclude(
        { path: 'product', method: RequestMethod.PATCH },
        'product/:id/randomFunction',
      )
      .forRoutes(
        /*{ path: 'product/:id*', method: RequestMethod.GET }*/ ProductController,
      );
  }
}
