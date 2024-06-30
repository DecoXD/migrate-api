import { ProductAttributes } from "../../interfaces/product"

export type IProductServiceProtocol = {
  getAll()
  getAllProductsByCategory(category:string,order?:string):Promise<void>
  getProductById(productId:string):Promise<void>
  saveProduct(product:ProductAttributes):Promise<void>
  deleteProduct(id:string):Promise<void>
  updateProduct(id:string):Promise<void>  
}