import { Request, Response } from "express";
import { IUserControllerProtocol} from "../interfaces/auth";
import { IUserServiceProtocol } from "../services/authServices/IUserService";
import { HttpException } from "../exceptions/HttpException";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";


export class UserController implements IUserControllerProtocol{
  
  constructor( private service:IUserServiceProtocol){
    
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    //implements zod verification 

    const {name,email,password} = req.body

    const data = {
      name,email,password
    }

    try {
      const newUser = await this.service.registerUser(data)
      return res.status(201).json({user:newUser,message:'Usuário cadastrado com sucesso'})
    } catch (error) {
      if(error instanceof HttpException){
       return res.status(error.statusCode).json({message:error.message})
      }   
    }
  }

  async toAccessUser(req:Request,res:Response):Promise<Response> {
    const {email,password} = req.body
    const data = {
      email,
      password
    }
    try {
      //check if email exists
      
      // verify password


      //send token to registred email

      //handling login
    } catch (error) {
      
    }

    return res


    


  }

  async updateUserById(req:Request,res:Response):Promise<Response> {
    return res
  }


}