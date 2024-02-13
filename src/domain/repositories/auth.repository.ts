import { RegisterUserDto } from "../dtos/auth/registerUser.dto";
import { UserEntity } from "../entities/user.entity";



export abstract class AuthRepository {


    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>


}