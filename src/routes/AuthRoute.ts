import { Router } from "express";
import { UserService } from "../services/auth/UserService";
import { CreateUserVerificator } from "../verificators/auth/CreateUserVerificator";
import { IUserAuthControllerProtocol } from "../controllers/Auth/User/IUserController";
import { UserController } from "../controllers/Auth/User/UserController";
import { TokenManipulator } from "../utilities/Token";

function getUserController():IUserAuthControllerProtocol{
    const userService = new UserService()
    const userVerificator = new CreateUserVerificator(userService)
    const tokenManipulator = new TokenManipulator()
    const userController = new UserController(userService,userVerificator,tokenManipulator)
    return userController
}

//Put him in an factory function that returns an complete controller instance or in a factory class that return every auth controller that i'll use

const userController = getUserController()

const router = Router()

router.post('/createaccount',userController.createUser.bind(userController))
router.post('/signin',userController.toAccessUser.bind(userController))


export default router