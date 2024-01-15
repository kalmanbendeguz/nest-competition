import { Global, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';

@Global()
@Module({
  controllers: [ProductController],
  providers: [ProductService],
  // this way i can register a global-scoped filter directly from this module.
  exports: [
    ProductService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  // imports: [DatabaseModule.forRoot([User])], // importing a dynamic module
  // it can re-export modules that it imports as well
})
export class ProductModule {
  constructor(private productService: ProductService) {}

  // dynamic module definition

  //static forRoot(entities = [], options?): DynamicModule {
  //  const providers = createDatabaseProviders(options, entities);
  //  return {
  //    global: true, // if we want it global
  //    module: DatabaseModule,
  //    providers: providers,
  //    exports: providers,
  //  };
  //}
}
