import { Request, Response } from "express";


import { IProductServiceProtocol } from "../../services/product/IProductService";
import { IProductControllerProtocol } from "./IProductController";


export class ProductController implements IProductControllerProtocol{
  constructor(private service:IProductServiceProtocol){
    
  }

  async getAllProducts(req: Request, res: Response):Promise<Response>{
    try {
      const productList = await this.service.getAll()
      return res.status(201).json({productList})
    } catch (error) {
      
    }
    return  
  }

  getProductById(req: Request, res: Response): Promise<void> {
    return
  }

  async addProduct(req: Request, res: Response): Promise<Response> {
    const {name,price,discription,stock,category,discount} = req.body;
    //
    const productData = {
      name,
      price,
      discription,
      stock,
      discount,
      category
    }

    try {
      const product = await this.service.saveProduct(productData)
      return res.status(200).json({message:'produto cadastrado com sucesso !',product})
      
    } catch (error) {
      console.log(error)
    }

    return  
  }

  deleteProduct(req: Request, res: Response): Promise<void> {
    return 
  }


  updateProductData(req: Request, res: Response): Promise<void> {
    return
  }

 
}