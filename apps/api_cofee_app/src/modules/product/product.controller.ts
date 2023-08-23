import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, ParseFilePipeBuilder, HttpStatus, Req, UseInterceptors, UsePipes, UseGuards, StreamableFile, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductCategory } from './dto/product-category.dto';
import { ProductDto } from './dto/product.dto';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { TransformIntPipe } from '../../transform_int/transform_int.pipe';
import { JwtAuthGuard } from '@app/jwt/jwt_guard/jwt_guard.guard';
import { UtilsService } from '@app/utils';
import { Roles } from 'libs/custom_decorators/roles.decorators';
import { RoleGuardGuard } from '../../role-guard/role-guard.guard';
import { createReadStream } from 'fs';
import { join } from 'path';
import { ProductUpdateDto } from './dto/product-update.dto';

@Controller('/api/v1/product')
export class ProductController {
  constructor(private readonly productService: ProductService, private utilService:UtilsService ) {}


  @UseGuards(JwtAuthGuard,RoleGuardGuard)
  @Roles(1)
  @Get('/category/list')
  async findProductCategory(){
    return await this.productService.findCategoryProduct()
    
  }
  @UseGuards(JwtAuthGuard,RoleGuardGuard)
  @Roles(1)
  @Post('/addCategory')
  async AddCategory(@Body() ProductCategoryDto: ProductCategory ) {
    return await this.productService.addcategory(ProductCategoryDto);
  }

  @UseGuards(JwtAuthGuard,RoleGuardGuard)
  @Roles(1)
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(TransformIntPipe)
  @Post('/addProduct')
  async AddProduct(@Body() productDto: ProductDto, @UploadedFile(
    new ParseFilePipeBuilder()
    .addFileTypeValidator({
      fileType: new RegExp(/[^\s]+(.*?).(jpg|jpeg|png|JPG|JPEG|PNG)$/),
    })
    .addMaxSizeValidator({
      maxSize: 1000000 * 10
    })
    .build({
      fileIsRequired: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
    }),
  ) file : Express.Multer.File) {    
    return await this.productService.addProduct(productDto, file);
  }

  @Get('/list')
  async findAll() {
    
    return await this.productService.findAll();
  }

  @Get('/list/:id')
  async findDetail(@Param('id') id : number) {
    return await this.productService.findOne(+id);
  }


  @UseGuards(JwtAuthGuard,RoleGuardGuard)
  @Roles(1)
  @UseInterceptors(FileInterceptor('file'))
  @Patch('/list/:id')
  async UpdateProduct(@Param('id', ParseIntPipe) id : number, @Body(new TransformIntPipe()) productupdatedto : ProductUpdateDto, @UploadedFile(
    new ParseFilePipeBuilder()
    .addFileTypeValidator({
      fileType: new RegExp(/[^\s]+(.*?).(jpg|jpeg|png|JPG|JPEG|PNG)$/),
    })
    .addMaxSizeValidator({
      maxSize: 1000000 * 10
    })
    .build({
      fileIsRequired: false,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
    }),
  ) file : Express.Multer.File ) {
    
    return await this.productService.updateproduct(id, productupdatedto, file);

  }

  @UseGuards(JwtAuthGuard,RoleGuardGuard)
  @Roles(1)
  @Patch('/list/category/:id')
  async UpdateProductCategory(@Param('id', ParseIntPipe) id: number, @Body() updateProductCategoryDto : ProductCategory){
    return await this.productService.updateCategoryProduct(id, updateProductCategoryDto)
    
  }

  @UseGuards(JwtAuthGuard,RoleGuardGuard)
  @Roles(1)
  @Delete('list/remove/:id')
  async removeProduct(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.removeproduct(id);
  }

  @UseGuards(JwtAuthGuard,RoleGuardGuard)
  @Roles(1)
  @Delete('list/remove/category/:id')
  async removeProductCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.removeproductCategory(id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productService.update(+id, updateProductDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productService.remove(+id);
  // }
}
