import { prismaClient } from "../../config/dbConfig";
import { HttpException } from "../../exceptions/HttpException";
import { ProductAttributes } from "../../interfaces/product";
import { IProductServiceProtocol } from "./IProductService";

export class ProductService implements IProductServiceProtocol{
  
  async deleteProduct(id: string): Promise<void> {
    
  }

  async getAll(){
    
    try {
      const products = await prismaClient.product.findMany()
      if(!products) new HttpException("nenhum produto encontrado",404)
      return products
    } catch (error) {
      if(error instanceof HttpException){
        throw new HttpException(error.message,error.statusCode)
      }
      throw new HttpException('Server Error',500)
    }
  }

  async getAllProductsByCategory(category: string, order?: string): Promise<void> {
    
  }

  async getProductById(productId: string): Promise<void> {
    
  }

  async saveProduct(product: ProductAttributes): Promise<void> {
    try {
      await prismaClient.product.create({
        data:product
      })
    } catch (error) {
      console.log('error')
    }
  }

  async updateProduct(id: string): Promise<void> {
    
  }
}