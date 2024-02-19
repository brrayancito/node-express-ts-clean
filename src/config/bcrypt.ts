import { compareSync, hashSync } from 'bcryptjs'


export class BcryptAdapter {


    static hash(password: string): string {
        return hashSync(password)
    }

    // password: from login | hashed: from database 
    static compare(password: string, hashed: string): boolean {
        return compareSync(password, hashed)
    }
}