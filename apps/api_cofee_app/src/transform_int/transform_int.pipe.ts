import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TransformIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    
    

    const data = {
      ...value,
      stock : parseInt(value.stock),
      harga : parseInt(value.harga),
      product_category_id : parseInt(value.product_category_id),
    }
    
    if (!value.stock){
      delete data.stock
    }

    if (!value.harga){
      delete data.harga
    }

    if (!value.product_category_id){
      delete data.product_category_id
    }

    return data
  }
}
