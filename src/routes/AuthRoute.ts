import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { UserService } from "../services/authServices/UserService";
import { CreateUserVerificator } from "../verificators/auth/CreateUserVerificator";
import { IUserControllerProtocol } from "../interfaces/auth";

function getUserController():IUserControllerProtocol{
    const userVerificator = new CreateUserVerificator()
    const userService = new UserService(userVerificator)
    const userController = new UserController(userService)
   
    return userController
}

//Put him in an factory function that returns an complete controller instance or in a factory class that return every auth controller that i'll use

const userController = getUserController()

const router = Router()

router.post('/createaccount',userController.createUser.bind(userController))


export default router