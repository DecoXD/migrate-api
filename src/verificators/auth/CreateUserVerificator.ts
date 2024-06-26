import { HttpException } from "../../exceptions/HttpException";
import { IUserAttributes, IUserLoginAttributes } from "../../interfaces/auth";
import { ICreateUserVerificator } from "./ICreateUserVerificator";
import { IUserServiceProtocol } from "../../services/auth/IUserService";
import bcrypt from 'bcrypt';


export class CreateUserVerificator implements ICreateUserVerificator{

  constructor(private service:IUserServiceProtocol){}

  async emailAlreadyExists(email:string): Promise<IUserAttributes | undefined> {

      const user = await this.service.getUserByEmail(email)

      if(!user) return 
      
      return user
   
  }

  async passwordMatch(userPassword:string,password:string):Promise<boolean> {

     try {
      const passwordMatch = await bcrypt.compare(password,userPassword)
      
      if(!passwordMatch) throw new HttpException('email or password are incorrect2',401)
      return true
     } catch (error) {
        throw new Error(error.message)
     }
   
  }

  async startLoginVerification(user:IUserLoginAttributes): Promise<void> {
    try {
      
      this.fieldsAreFilled(user)
      
      //check if user exists
      
      const userData = await this.emailAlreadyExists(user.email)
      
      if(!userData) throw new HttpException('email or password are incorrect2',401)
      //check if password match
      
      await this.passwordMatch(userData.password,user.password)
      
    } catch (error) {
        if(error instanceof HttpException){
          throw new HttpException(error.message,error.statusCode)
        } else{
          throw new HttpException('server error',501)
        }
    }
  }

  fieldsAreFilled(fields:Record<string,unknown>):boolean{
    const allFieldsArentFiled = Object.values(fields).some((value) => !value)
    
    
    if(allFieldsArentFiled) throw new HttpException('preencha todos os campos',409)
    return true
  }

  async startRegisterVerification(user:IUserAttributes): Promise<void> {
    try {
      //check if all fields are filled
      this.fieldsAreFilled(user)
      //check if email exists
      const userExists = await this.emailAlreadyExists(user.email)
      
      if(userExists){
        throw new HttpException('usuário ou senha incorretos register',409)
      }
    } catch (error) {
      if(error instanceof HttpException){
        throw new HttpException(error.message,error.statusCode)
      } else{
        throw new HttpException('System Error',501)
      }
    }
  }

 
}