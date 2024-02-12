import { Validators } from "../../../config/validators";


export class RegisterUserDto {
    private constructor(
        public name: string,
        public email: string,
        public password: string
    ) {}

    static create(object: {[key: string]: any}): [string?, RegisterUserDto?]{

        const {name, email, password} = object;
        if (!name) return ["Name is required"];
        if (!email) return ["Email is required"];
        if (!Validators.email.test(email)) return ["This email is not valid"];
        if (!password) return ["Password is required"];
        if (password.length < 8) return ["Password too short! Min 8 characters"];

        return [
            undefined,
            new RegisterUserDto(name, email, password)
        ];
    }
}