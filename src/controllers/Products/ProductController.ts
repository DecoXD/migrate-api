import { Request, Response } from "express";


import { IProductServiceProtocol } from "../../services/product/IProductService";
import { IProductControllerProtocol } from "./IProductController";
import { IProductVerificatorProtocol } from "../../verificators/product/IProductVerificatorProtocolt";
import { ITokenManipulator } from "../../utilities/interfaces";
import { HttpException } from "../../exceptions/HttpException";


export class ProductController implements IProductControllerProtocol{
  constructor(
    private service:IProductServiceProtocol,
    private verificator:IProductVerificatorProtocol,
    ){
    
  }

  async getAllProducts(req: Request, res: Response):Promise<Response>{
    try {
      const productList = await this.service.getAll()
      return res.status(201).json({productList})
    } catch (error) {
      
    }
    return  
  }

  async getProductById(req: Request, res: Response): Promise<Response> {
    const {id} = req.body
    try {
      const product = await this.service.getProductById(id) 
    } catch (error) {
      if(error instanceof HttpException){
       return res.status(error.statusCode).json({message:error.message})
      }
      return res.status(501).json({message:'systemError'})
    }
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
      const userId = await this.verificator.addProductVerificator(req,productData)
      Object.assign(productData,{userId})

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