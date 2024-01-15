import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FastifyRequest, FastifyReply } from 'fastify';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductService {
  private readonly products: Product[] = [];

  create(product: Product) {
    this.products.push(product);
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  randomFunction(
    request: FastifyRequest,
    response: FastifyReply,
    id: number,
    data: string,
    query: string,
    headers: string[],
    ip: string,
    hostParam: string,
  ): string {
    const abc = {
      reqQuery: request.query,
      resStatusCode: response.statusCode,
      id: id,
      bodyData: data ?? 'UNDEF',
      queryData: query ?? 'UNDEF',
      headers: headers ?? 'UNDEF',
      ip: ip ?? 'UNDEF',
      hostParam: hostParam ?? 'UNDEF',
    };
    return JSON.stringify(abc);
  }
}
