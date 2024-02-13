import { RegisterUserDto } from "../dtos/auth/registerUser.dto";
import { UserEntity } from "../entities/user.entity";



export abstract class AuthDatasource {
    

    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity> 
}