import { join } from "node:path";
import { IUserAttributes } from "../../interfaces/auth";
import { IUserServiceProtocol } from "./IUserService";
import { readFile} from "node:fs/promises";
import { fileURLToPath } from "node:url";

export class UserServiceMock implements IUserServiceProtocol{

  async getAllUsers(): Promise<IUserAttributes[]|null> {
    const path =join(__dirname,'..','..','mock','db','Users.json')
    const items = (await readFile(path)).toString()
    const resolve = await JSON.parse(items)
    return resolve.Users
   
  }

  async getUser(id: string): Promise<void | IUserAttributes> {
    
  }

  async getUserByEmail(email: string): Promise<null | IUserAttributes> {
    const userList = await this.getAllUsers()
    
    let res = null
    for (let i = 0 ; i <userList.length;i++){
      if(userList[i].email != email){
        continue
      }
      res = userList[i]
      break
    }

    return res
  }

  async registerUser(userData: IUserAttributes): Promise<IUserAttributes> {
    return userData
  }

  async unregisterUser(id: string): Promise<void> {
    
  }

  async updateUser(id: string, data: IUserAttributes): Promise<void> {
    
  }
}
