import { Request, Response } from "express";
import { AuthRepository, CustomError, RegisterUserDto } from "../../domain";


export class AuthController {

    constructor(
        private readonly authRepository: AuthRepository
    ) { }

    registerUser = async (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body)

        if (error) return res.status(400).json({ error: error })

        this.authRepository.register(registerUserDto!)
            .then(user => res.json(user))
            .catch(error => {
                if (error instanceof CustomError) {
                    return res.status(error.statusCode).json({ error: error.message })
                }

                res.status(500).json({ Error: "Internal Server Error" })
            })
    }

    loginUser = (req: Request, res: Response) => {
        res.json({
            message: "loginUser method"
        })
    }
}