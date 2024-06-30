import { Request, Response } from "express"


export type IProductControllerProtocol = {
  getAllProducts(req: Request, res: Response):Promise<Response>
  getProductById(req:Request,res:Response):Promise<void>
  addProduct(req:Request,res:Response):Promise<Response>
  updateProductData(req:Request,res:Response):Promise<void>
  deleteProduct(req:Request,res:Response):Promise<void>
  // updateProductQuanty(req:Request,res:Response):Promise<void> ta mais para o controlador do carrinho


}