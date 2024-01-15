import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  Query,
  Headers,
  Ip,
  HostParam,
  HttpCode,
  Header,
  Redirect,
  HttpRedirectResponse,
  HttpStatus,
  Optional,
  Inject,
  Sse,
  HttpException,
  ForbiddenException,
  UseFilters,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FastifyRequest, FastifyReply } from 'fastify';
import { Observable, interval, map, of } from 'rxjs';
import { Product } from './interfaces/product.interface';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';

@Controller('product')
@UseFilters(HttpExceptionFilter)
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @Optional()
    @Inject('CUSTOM_TOKEN')
    private optionalProvider: string,
  ) {}

  @Post()
  @UseFilters(
    new HttpExceptionFilter() /** but preferably just: HttpExceptionFilter*/,
  )
  async create(@Body() createProductDto: CreateProductDto) {
    throw new ForbiddenException();
    //return this.productService.create(createProductDto);
  }

  @Get('cd*')
  @HttpCode(202)
  @Header('Cache-Control', 'max-age=123')
  findWildcard() {
    return 'This route uses a wildcard and returns httpcode 202';
  }

  @Get()
  async findAll(): Promise<Product[]> {
    try {
      throw new ForbiddenException();
      //return this.productService.findAll();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom error message.',
        },
        HttpStatus.FORBIDDEN,
        { cause: error },
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

  @Get(':id/randomFunction')
  randomFunction(
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) response: FastifyReply,
    @Param('id') id: string,
    @Body('data') data: string,
    @Query('data') query: string,
    @Headers() headers: string[],
    @Ip() ip: string,
    @HostParam() hostParam: string,
  ): string {
    return this.productService.randomFunction(
      request,
      response,
      +id,
      data,
      query,
      headers,
      ip,
      hostParam,
    );
  }

  @Get('redirected')
  @Redirect('https://google.com', 302)
  redirected() {
    const redirectResponse: HttpRedirectResponse = {
      url: 'https://facebook.com',
      statusCode: 302,
    };
    return redirectResponse;
  }

  @Get('asyncFunction')
  async asyncFunction(): Promise<any[]> {
    return [1, 2, 3];
  }

  @Get('observable')
  asyncFunctionObservable(): Observable<any[]> {
    return of([4, 5, 6]);
  }

  @Post('createLibrarySpecific')
  createLibrarySpecific(@Res() res: FastifyReply) {
    res.code(HttpStatus.CREATED).send();
  }

  @Get('findAllLibrarySpecific')
  findAllLibrarySpecific(@Res() res: FastifyReply) {
    res.code(HttpStatus.OK).send([7, 8, 9]);
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map((_) => ({ data: { hello: 'world' } }) as MessageEvent),
    );
  }
}
