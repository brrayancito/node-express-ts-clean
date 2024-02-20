import { UserEntity } from "../../domain";


export class UserMapper {

    static userEntityFromObject(object: { [key: string]: any }) {
        return new UserEntity(
            object._id,
            object.name,
            object.email,
            object.password,
            object.roles,
        )
    }
}