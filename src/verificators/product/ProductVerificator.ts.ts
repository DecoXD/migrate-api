import { ProductAttributes } from "../../interfaces/product";
import { IProductVerificatorProtocol } from "./IProductVerificatorProtocolt";

export class ProductVerificator implements IProductVerificatorProtocol{

  async addProductVerificator(product: ProductAttributes): Promise<void> {
    //verificar se todos os campos estão preenchidos 
    //verificar permissões de usuário pelo userId do produto 

  }

  async deleteProductVerificator(product: ProductAttributes): Promise<void> {
    //verificar permissão do usuário 
  }

  async updateProductVerificator(product: ProductAttributes): Promise<void> {
    //verificar se todos os campos estão preenchidos 
    //verificar permissão do usuário
  }
}