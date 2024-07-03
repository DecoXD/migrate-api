import { Request } from "express";
import { HttpException } from "../../exceptions/HttpException";
import { ProductAttributes } from "../../interfaces/product";
import { IUserServiceProtocol } from "../../services/auth/IUserService";
import { IProductServiceProtocol } from "../../services/product/IProductService";
import { TokenManipulator } from "../../utilities/Token";
import { ITokenManipulator } from "../../utilities/interfaces";
import { IProductVerificatorProtocol } from "./IProductVerificatorProtocolt";
import { allFieldsAreFilled } from "../../utilities/checkFields";

export class ProductVerificator implements IProductVerificatorProtocol{

  constructor(
    private productService:IProductServiceProtocol,
    private userService:IUserServiceProtocol,
    private tokenManipulator:ITokenManipulator){

  }



  async verifyUserPermissions(userId:string){
    try {
      const user = await this.userService.getUserById(userId)
      const adminCode = process.env.APP_ADMIN_CODE
      
      if(user.role != adminCode){
        throw new HttpException('você não tem permissão para realizar essa operação',403)
      }
      return true
    } catch (error) {
      if(error instanceof HttpException){
        throw new HttpException(error.message,error.statusCode)
      } 
      throw new HttpException('System Error',501)
    }
  }

  async addProductVerificator(req:Request,product: ProductAttributes): Promise<string> {
    try {
      //verificar se todos os campos estão preenchidos 
    
      const fieldsAreFilled = allFieldsAreFilled(product)
      
      if(!fieldsAreFilled) throw new HttpException('Por favor Preencha todos os campos',404)
      //pegar o id do usuário pelo token e verificar se ele tem permissão de ADMIN
      const token = await this.tokenManipulator.getToken(req)
      const {userId} = await this.tokenManipulator.getUserByToken(token)
      if(!userId) throw new HttpException('você nao possui permissão para realizar essa operação',403)
      this.verifyUserPermissions(userId)
      return userId
    } catch (error) {
      if(error instanceof HttpException){
        throw new HttpException(error.message,error.statusCode)
      } 
      throw new HttpException('System Error',501)
    }

  }

  async deleteProductVerificator(product: ProductAttributes): Promise<void> {
    //verificar permissão do usuário 
  }

  async updateProductVerificator(product: ProductAttributes): Promise<void> {
    //verificar se todos os campos estão preenchidos 
    //verificar permissão do usuário
  }
}