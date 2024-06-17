import { HttpException } from '../../exceptions/HttpException'
import {IUserServiceProtocol} from '../../services/authServices/IUserService'
import{UserServiceMock} from '../../services/authServices/UserServiceMock'
import {CreateUserVerificator} from './CreateUserVerificator'
function createVerificator(service:IUserServiceProtocol){
  return new CreateUserVerificator(service)
}

const mockService = new UserServiceMock()
const verificator = createVerificator(mockService)


describe('testing register verification',() =>{
  let body = {
    name:'André',
    email:'deco.xd@outlook.com',
    password:'s10904594'
  }
  it('should be return an instance of HttpExceptions if email exists',async () =>{

   
    
    await expect(verificator.startRegisterVerification(body)).rejects.toBeInstanceOf(HttpException)

  })

  it('should be return success if email dont exists',async () =>{
    body = {
      name:'André',
      email:'deco.xds@outlook.com',
      password:'s10904594'
    }
   
    
    await expect(verificator.startRegisterVerification(body)).resolves.toBeUndefined()

  })
   
  it('should be return an instance of HttpExceptions cause all fields are not filled',async () =>{

    body = {
      name:'André',
      email:'deco.xds@outlook.com',
      password:''
    }
    
    await expect(verificator.startRegisterVerification(body)).rejects.toBeInstanceOf(HttpException)

  })
  it('should be return an instance of HttpExceptions cause all fields are not filled',async () =>{

    body = {
      name:'',
      email:'deco.xds@outlook.com',
      password:'s10904594'
    }
    
    await expect(verificator.startRegisterVerification(body)).rejects.toBeInstanceOf(HttpException)

  })
  it('should be return an instance of HttpExceptions cause all fields are not filled',async () =>{

    body = {
      name:'André',
      email:'',
      password:'s10904594'
    }
    
    await expect(verificator.startRegisterVerification(body)).rejects.toBeInstanceOf(HttpException)

  })
  it('should be return an instance of HttpExceptions cause all fields are not filled',async () =>{

    body = {
      name:'',
      email:'',
      password:''
    }
    
    await expect(verificator.startRegisterVerification(body)).rejects.toBeInstanceOf(HttpException)

  })



})


describe('testing login verification',() =>{
    let body = {
      email:'deco.xd@outlook.com',
      password:'s10904594'
    }
    
    it('should be return an instance of HttpExceptions if email dont exists',async () =>{  
      body = {
        email:'deco.xds@outlook.com',
        password:'s10904594'
      } 
      await expect(verificator.startLoginVerification(body)).rejects.toBeInstanceOf(HttpException)
    })

    it('should be return success if email exists',async () =>{    
      body = {
        email:'deco.xd@outlook.com',
        password:'s10904594'
      }
      await expect(verificator.startLoginVerification(body)).resolves.toBeUndefined()

    })
    
    it('should be return an instance of HttpExceptions if password not match',async () =>{
      body = {
        email:'deco.xd@outlook.com',
        password:'1234567'
      }
  
      await expect(verificator.startLoginVerification(body)).rejects.toBeInstanceOf(HttpException)

    })


    it('should be return success if password match',async () =>{ 
      body = {
        email:'deco.xd@outlook.com',
        password:'s10904594'
      }
      await expect(verificator.startLoginVerification(body)).resolves.toBeUndefined()

    })



})