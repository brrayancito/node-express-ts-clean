import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/loginUser.dto";
import { UserMapper } from "../mappers/user.mapper";

type hashPasswordFunction = (password: string) => string
type comparePasswordFunction = (password: string, hashed: string) => boolean

export class AuthDatasourceImpl implements AuthDatasource {

    constructor(
        private readonly hashPasswordFunc: hashPasswordFunction = BcryptAdapter.hash,
        private readonly comparePasswordFunc: comparePasswordFunction = BcryptAdapter.compare
    ) { }

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

        const { name, email, password } = registerUserDto;

        try {
            // Email exist?
            const exist = await UserModel.findOne({ email: email });
            if (exist) throw CustomError.badRequest("User already exists");

            // Create user
            const user = await UserModel.create({
                name: name,
                email: email,
                password: this.hashPasswordFunc(password)
            }).catch(error => { throw CustomError.internalServer("Something went wrong on creating user!") });

            await user.save();

            return UserMapper.userEntityFromObject(user);

        } catch (error) {
            if (error instanceof CustomError) throw error;

            throw CustomError.internalServer();

        }
    }

    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {

        const { email, password } = loginUserDto;

        try {
            const user = await UserModel.findOne({ email: email });
            if (!user) throw CustomError.badRequest("User not found");

            if (!this.comparePasswordFunc(password, user.password)) {
                throw CustomError.badRequest("Invalid credentials");
            }

            return UserMapper.userEntityFromObject(user);

        } catch (error) {
            if (error instanceof CustomError) throw error;

            throw CustomError.internalServer();
        }
    }

}