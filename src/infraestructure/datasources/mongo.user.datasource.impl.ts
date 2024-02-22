import { UserModel } from "../../data/mongodb";
import { CustomError, UserDatasource, UserEntity } from "../../domain";
import { UserMapper } from "../mappers/user.mapper";




export class UserDatasourceImpl implements UserDatasource {

    async getUsers(): Promise<UserEntity[]> {

        try {
            const users = await UserModel.find();
            return users.map((user) => UserMapper.userEntityFromObject(user))

        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer();

        }
    }

}