import { UserDatasource, UserEntity, UserRepository } from "../../domain";
import { UserDatasourceImpl } from "../datasources/mongo.user.datasource.impl";



export class UserRepositoryImpl implements UserRepository {

    constructor(
        private readonly userDatasource: UserDatasource = new UserDatasourceImpl
    ) { }


    getUsers(): Promise<UserEntity[]> {
        return this.userDatasource.getUsers();
    }

}