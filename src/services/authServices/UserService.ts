//realizar o crud aqui

/*eslint disable */
import { prismaClient } from "../../config/dbConfig";
import { HttpException } from "../../exceptions/HttpException";
import { IUserAttributes, IUserLoginAttributes } from "../../interfaces/auth";
import { CreateUserVerificator } from "../../verificators/auth/CreateUserVerificator";
import { IUserServiceProtocol } from "./IUserService";




export class UserService implements IUserServiceProtocol {
  private userVerificator: CreateUserVerificator

  constructor(verificator:CreateUserVerificator){
    this.userVerificator = verificator
  }

  async registerUser(userData: IUserAttributes) {

    const user = await prismaClient.user.create({
      data:userData
    })
    if(!user){
      throw new HttpException('unknown error',500)
    }
    return user
  
  
  }

  async toAccessUserAccount(user:IUserLoginAttributes){
    try {
      const userVerified = await this.userVerificator.startLoginVerification(user)

    } catch (error) {
      
    }  
}

  async getUser(id:string){
   
    const user = await  prismaClient.user.findUnique({ where:{
      id:id
    }})

    if(!user) throw new HttpException('user not found',401)
    return user

  }

  async getAllUsers(){
    await prismaClient.user.findMany()
  }

  async updateUser(id:string,data:IUserAttributes){
    await prismaClient.user.update({
      where:{
        id:id
      },
      data:data

    })
  }

  async unregisterUser(id:string){}
}