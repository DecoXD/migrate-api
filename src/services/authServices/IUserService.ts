import { IUserAttributes, IUserLoginAttributes } from "../../interfaces/auth"

export type IUserServiceProtocol = {
    registerUser(userData:IUserAttributes):Promise<IUserAttributes>
    getUser(id:string):Promise<IUserAttributes | void>
    getUserByEmail(id:string):Promise<IUserAttributes | void>
    getAllUsers():Promise<void>
    updateUser(id:string,data:IUserAttributes):Promise<void>
    unregisterUser(id:string):Promise<void>  
}