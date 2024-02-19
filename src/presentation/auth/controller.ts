import { Request, Response } from "express";
import { AuthRepository, RegisterUserDto } from "../../domain";


export class AuthController {

    constructor(
        private readonly authRepository: AuthRepository
    ) { }

    registerUser = async (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body)

        if (error) return res.status(400).json({ error: error })

        // const user = await this.authRepository.register(registerUserDto!)

        this.authRepository.register(registerUserDto!)
            .then(user => res.json(user))
            .catch(error => res.status(404).json({ error: error.message }))
    }

    loginUser = (req: Request, res: Response) => {
        res.json({
            message: "loginUser method"
        })
    }
}