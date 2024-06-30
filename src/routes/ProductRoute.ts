import { Router } from "express";
import { IProductServiceProtocol } from "../services/product/IProductService";
import { IProductControllerProtocol } from "../controllers/Products/IProductController";
import { ProductController } from "../controllers/Products/ProductController";
import { ProductService } from "../services/product/ProductService";

const ProductRouter = Router()

function getProductController(service:IProductServiceProtocol):IProductControllerProtocol{
  const controller = new ProductController(service)
  return controller
}

const service = new ProductService()
const controller = getProductController(service)

ProductRouter.post('/create',controller.addProduct.bind(controller))
ProductRouter.get('/',controller.getAllProducts.bind(controller))

export {ProductRouter}