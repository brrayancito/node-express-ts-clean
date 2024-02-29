import { LoginUserDto } from "../dtos/auth/loginUser.dto";
import { RegisterUserDto } from "../dtos/auth/registerUser.dto";
import { UserEntity } from "../entities/user.entity";


export abstract class AuthDatasource {
    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>
    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>
}