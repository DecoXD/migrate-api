import { IUserAttributes, IUserLoginAttributes } from "../../interfaces/auth"

export type ICreateUserVerificator = {
  passwordMatch(userPassword:string,password:string):Promise<boolean>,
  emailAlreadyExists(email:string):Promise<IUserAttributes | undefined>
  startLoginVerification(user:IUserLoginAttributes):Promise<void>
  startRegisterVerification(user:IUserAttributes):Promise<void>


}