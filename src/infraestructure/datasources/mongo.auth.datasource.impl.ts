import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";


export class AuthDatasourceImpl implements AuthDatasource {
    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

        const { name, email, password } = registerUserDto;

        try {
            // Email exist?
            const exist = await UserModel.findOne({ email: email });
            if (exist) throw CustomError.badRequest("User already exists");

            // Hash password


            // Create user
            const user = await UserModel.create({
                name: name,
                email: email,
                password: BcryptAdapter.hash(password)
            });

            await user.save();

            return new UserEntity(
                user.id,
                name,
                email,
                user.password,
                user.roles,
            );

        } catch (error) {
            if (error instanceof CustomError) throw error;

            throw CustomError.internalServer();

        }
    }

}