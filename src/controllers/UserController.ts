import { Request, Response } from "express";
import { ICreateUserVerificator, IUserControllerProtocol} from "../interfaces/auth";
import { IUserServiceProtocol } from "../services/authServices/IUserService";
import { HttpException } from "../exceptions/HttpException";

export class UserController implements IUserControllerProtocol{
  
  constructor( private service:IUserServiceProtocol,private verificator:ICreateUserVerificator){
    
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    //implements zod verification 
    const {name,email,password} = req.body

    const data = {
      name,email,password
    }

    try {
      await this.verificator.startRegisterVerification(data)
      const newUser = await this.service.registerUser(data)// talvez deixar o hash para outra classe possa ser uma boa ideia
      return res.status(201).json({user:newUser,message:'Usuário cadastrado com sucesso'})
    } catch (error) {
      if(error instanceof HttpException){
       return res.status(error.statusCode).json({message:error.message})
      }   else{
        throw new HttpException('system error create user',501)
      }
    }
  }

  //login fn
  async toAccessUser(req:Request,res:Response):Promise<Response> {
    const {email,password} = req.body
    const data = {
      email,
      password
    }
    try {
      // the responsability to verify if email exists and password and if others business rules matches is directed to verificator
      await this.verificator.startLoginVerification(data)
      //send token to registred email
      res.status(200).json({message:'ok'})
      //handling login
    } catch (error) {
      if(error instanceof HttpException){
        res.status(error.statusCode).json({message:error.message})
      } else{
        res.status(501).json({message:"system error usercontroller"})
      }
    }

    return res


    


  }

  async updateUserById(req:Request,res:Response):Promise<Response> {
    return res
  }


}