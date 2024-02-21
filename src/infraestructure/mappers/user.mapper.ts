import { UserEntity } from "../../domain";


export class UserMapper {

    static userEntityFromObject(object: { [key: string]: any }) {
        const { _id, name, email, password, roles } = object
        return new UserEntity(
            _id,
            name,
            email,
            password,
            roles,
        )
    }
}