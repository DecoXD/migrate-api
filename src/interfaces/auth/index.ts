/* eslint-disable */
import { Request, Response } from "express";

export type IUserAttributes = {
    name:string,
    email:string,
    password:string,
    id?:string
}
export type IUserLoginAttributes = {
    email:string,
    password:string,
}

export type ICreateUserVerificator = {
  passwordMatch(userPassword:string,password:string):Promise<boolean>,
  emailAlreadyExists(email:string):Promise<IUserAttributes | undefined>
  startLoginVerification(user:IUserLoginAttributes,):Promise<void>
  startRegisterVerification(user:IUserAttributes):Promise<void>
  fieldsAreFilled(fields:Record<string,unknown>):boolean

}

export type IUserControllerProtocol = {
  createUser(req:Request,res:Response):Promise<Response>,
  toAccessUser(req:Request,res:Response):Promise<Response>,
  updateUserById(req:Request,res:Response):Promise<Response>,

}

export type IUserService={
  registerUser(userData:IUserAttributes):IUserAttributes
}