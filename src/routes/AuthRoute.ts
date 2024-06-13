import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { UserService } from "../services/authServices/UserService";
import { CreateUserVerificator } from "../verificators/auth/CreateUserVerificator";
import { IUserControllerProtocol } from "../interfaces/auth";

function getUserController():IUserControllerProtocol{
    const userService = new UserService()
    const userVerificator = new CreateUserVerificator(userService)
    const userController = new UserController(userService,userVerificator)
   
    return userController
}

//Put him in an factory function that returns an complete controller instance or in a factory class that return every auth controller that i'll use

const userController = getUserController()

const router = Router()

router.post('/createaccount',userController.createUser.bind(userController))
router.post('/signin',userController.toAccessUser.bind(userController))


export default router