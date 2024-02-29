import { Validators } from "../../../config";


export class LoginUserDto {
    private constructor(
        public email: string,
        public password: string
    ) { }

    static create(object: { [key: string]: any }): [string?, LoginUserDto?] {

        const { email, password } = object;
        if (!email) return ["Email is required"];
        if (!Validators.email.test(email)) return ["This email is not valid"];
        if (!password) return ["Password is required"];
        if (password.length < 8) return ["Password too short! Min 8 characters"];

        return [
            undefined,
            new LoginUserDto(email, password)
        ];
    }
}