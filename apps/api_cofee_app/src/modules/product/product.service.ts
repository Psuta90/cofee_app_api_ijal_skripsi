import { Injectable } from '@nestjs/common';
import { ProductCategory } from './dto/product-category.dto';
import { UtilsService } from '@app/utils';
import { ProductDto } from './dto/product.dto';
import { join } from 'path';
import { Express } from 'express';
import * as fs from 'fs-extra';
import { ProductUpdateDto } from './dto/product-update.dto';

@Injectable()
export class ProductService {
  constructor (private utilService : UtilsService){

  }

  async addcategory(ProductCategoryDto: ProductCategory) {
    try {

      await this.utilService.db.product_Category.create({
        data : {
          name : ProductCategoryDto.name
        }
      })

      return await this.utilService.response.success({code : 200, message:"berhasil menambahkan product category"});

    } catch (error) {
      return this.utilService.response.error({code : 400 , data : error , message:"gagal insert product category"})
    }
  }

  async addProduct(productDto : ProductDto, file : Express.Multer.File){

    const rootdirectory = `${process.cwd()}/public`
    const folderFile = 'image_product'
    const nameFile = `${this.utilService.toolsString.generateRandomString(10)}.${file.mimetype.split('/')[1]}`
    const filepath = join(rootdirectory,folderFile,nameFile)    
    try {
      
      await fs.ensureDir(join(rootdirectory,folderFile))
      await fs.writeFile(filepath,file.buffer);

      await this.utilService.db.product.create({
        data :{
          ...productDto,
          image : join(folderFile,nameFile)
        }
      })

      
      return this.utilService.response.success({
        code : 200,
        message : "berhasil add product"
      })
      
    } catch (error) {
      console.log(error);
      
      await fs.remove(filepath)
      return this.utilService.response.error({code : 400, message : "gagal insert produk"})
    }
    
  }

  async findAll() {
    try {
      const getAllProduct = await this.utilService.db.product.findMany({
        include : {
          product_category: true
        }
      })

      if(getAllProduct[0] !== undefined){
        
        return this.utilService.response.success(
        {
            code : 200, 
            data: getAllProduct,
            message : "berhasil mendapatkan list"
        })

      }else {
        return this.utilService.response.error({code : 400, data:getAllProduct, message : "data tidak ada"})
      }

    } catch (error) {
      console.log(error);
      return this.utilService.response.error({code : 400, data:error, message : "data tidak ada"})
      
    }
  }

  
  async findOne(id: number) {
    try {

      const getByID = await this.utilService.db.product.findUnique({
        where : {
          id
        }
      })


      if (getByID.id) {
        return await this.utilService.response.success({code : 200, data : getByID,message : "berhasil mendapatkan detail"})
      }else{
        return this.utilService.response.error({code : 400, data : getByID,message : "data tidak ditemukan"})
      }
      
      
    } catch (error) {
      console.log(error);
      return this.utilService.response.error({code : 400, data : error,message : "data tidak ditemukan"}) 
    }
  }

  async updateproduct (id : number,productUpdateDto : ProductUpdateDto, file:Express.Multer.File) {

    try {      
      
      const findproduct = await this.utilService.db.product.findUnique({
        where : {
          id
        }
      })

      if (findproduct){

        if (file){

            const rootdirectory = `${process.cwd()}/public`
            const folderFile = 'image_product'
            const newnameFile = `${this.utilService.toolsString.generateRandomString(10)}.${file.mimetype.split('/')[1]}`
            
            const filepathexistImage = join(rootdirectory,findproduct.image)
            const newFilePath = join(rootdirectory,folderFile,newnameFile)

            const updateProduct = await this.utilService.db.product.update({
              where : {
                id
              },
              data : {
                ...productUpdateDto,
                image : join(folderFile,newnameFile)
              }
            })


            console.log("update product",updateProduct);
            

            if(updateProduct){
              await fs.remove(filepathexistImage)
              await fs.ensureDir(join(rootdirectory,folderFile))
              await fs.writeFile(newFilePath,file.buffer);

              return await this.utilService.response.success({code : 200, message : "berhasil update dataa"})
            }else{
              return  this.utilService.response.error({code : 400, message : "gagal update data"})
            }

        }else {

          const updateProduct = await this.utilService.db.product.update({
            where : {
              id
            },
            data : {
              ...productUpdateDto
            }
          })

          if(updateProduct){
            return await this.utilService.response.success({code : 200, message : "berhasil update dataa"})
          }else{
            return  this.utilService.response.error({code : 400, message : "gagal update data"})
          }
          
        }

      }else {
        return  this.utilService.response.error({code : 400, message : "data tidak ditemukan"})
      }

      
    } catch (error) {
      console.log(error);
      return this.utilService.response.error({code : 400, data:error, message: "terjadi error"})
    }    
  }

  async updateCategoryProduct(id : number , updateCategoryProductDTO : ProductCategory){
    
    try {
        
      const findCategory = await this.utilService.db.product_Category.findUnique({
          where : {id}
      })

      if (findCategory) {
        
        const updateCategory = await this.utilService.db.product_Category.update({
          where : {id : findCategory.id},

          data:{
            name : updateCategoryProductDTO.name
          }
        })


        if (updateCategory){
          return this.utilService.response.success({code :200, data : updateCategory, message:"berhasil update data"})
        }else{
          return this.utilService.response.error({code :400, data : updateCategory, message:"gagal update category"})
        }
      }else{
        return this.utilService.response.error({code :400, message:"data yang mau di edit tidak di temukan"})
      }


    } catch (error) {
      console.log(error);
      return this.utilService.response.error({code :400, data : error, message:"gagal update category"})
      

      
    }
  }


  async removeproduct(id:number){
    try {

      const findproduct = await this.utilService.db.product.delete({
        where : {id}
      })

      if (findproduct){
        
        const rootdirectory = `${process.cwd()}/public`
        const filepathexistImage = join(rootdirectory,findproduct.image)
        await fs.remove(filepathexistImage)

        return await this.utilService.response.success({code:200,data:findproduct,message : "data berhasil di delete"})
      }

    } catch (error) {
      console.log(error);
      return this.utilService.response.error({
        code : 400,
        data: error,
        message : "Error"
      })
    }

  }

  async removeproductCategory(id:number){
    try {

      const findproduct = await this.utilService.db.product_Category.delete({
        where : {id}
      })

      if (findproduct){
        return await this.utilService.response.success({code:200,data:findproduct,message : "data berhasil di delete"})
      }

    } catch (error) {
      console.log(error);
      return this.utilService.response.error({
        code : 400,
        data: error,
        message : "Error"
      })
    }
  }

}
