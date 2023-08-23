import { ParseIntPipe } from "@nestjs/common";
import { Transform } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class ProductDto {
    @IsNotEmpty()
    name  : string;
    @IsNotEmpty()
    stock : number;
    @IsNotEmpty()
    harga : number;
    @IsNotEmpty()
    product_category_id : number;
    @IsNotEmpty()   
    description : string
}