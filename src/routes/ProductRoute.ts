import { Router } from "express";
import { IProductServiceProtocol } from "../services/product/IProductService";
import { IProductControllerProtocol } from "../controllers/Products/IProductController";
import { ProductController } from "../controllers/Products/ProductController";
import { ProductService } from "../services/product/ProductService";
import { ProductVerificator } from "../verificators/product/ProductVerificator.ts";
import { UserService } from "../services/auth/UserService";
import { TokenManipulator } from "../utilities/Token";

const ProductRouter = Router()

function getProductController():IProductControllerProtocol{
  const service = new ProductService()
  const userService = new UserService()
  const tokenManipulator =  new TokenManipulator()
  const verificator = new ProductVerificator(service,userService,tokenManipulator)
  
  const controller = new ProductController(service,verificator)
  return controller
}


const controller = getProductController()

ProductRouter.post('/create',controller.addProduct.bind(controller))
ProductRouter.get('/',controller.getAllProducts.bind(controller))

export {ProductRouter}