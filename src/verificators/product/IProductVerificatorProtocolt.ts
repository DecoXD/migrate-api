import { ProductAttributes } from "../../interfaces/product"

export type IProductVerificatorProtocol = {
  addProductVerificator(product:ProductAttributes):Promise<void>;
  updateProductVerificator(product:ProductAttributes):Promise<void>;
  deleteProductVerificator(product:ProductAttributes):Promise<void>
}