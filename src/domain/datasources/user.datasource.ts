import { UserEntity } from "..";



export abstract class UserDatasource {
    abstract getUsers(): Promise<UserEntity[]>
}