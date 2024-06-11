import { ICreateUserVerificator, IUserAttributes, IUserLoginAttributes } from "../../interfaces/auth";



export class CreateUserVerificator implements ICreateUserVerificator{

   async emailAlreadyExists(email:string): Promise<boolean> {
        return true
    }

    passwordMatch(password:string): Boolean {
        return true
    }

    async startLoginVerification(user:IUserLoginAttributes): Promise<void> {
        try {
            const userExists = this.emailAlreadyExists(user.email)
            

        } catch (error) {
            
        }
    }

    async startRegisterVerification(user:IUserAttributes): Promise<void> {
        return
    }
}