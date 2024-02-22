import { UserEntity } from "..";



export abstract class UserRepository {
    abstract getUsers(): Promise<UserEntity[]>
}