import { Request, Response } from "express";
import { AuthRepository, CustomError, RegisterUserDto } from "../../domain";
import { JwtAdapter } from "../../config";
import { LoginUserDto } from "../../domain/dtos/auth/loginUser.dto";


export class AuthController {

    constructor(
        private readonly authRepository: AuthRepository,
    ) { }

    registerUser = async (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body)

        if (error) return res.status(400).json({ error: error })

        try {
            const user = await this.authRepository.register(registerUserDto!)
            const token = await JwtAdapter.generateToken({ id: user.id })

            return res.status(201).json({
                user,
                token
            })

        } catch (error) {

            if (error instanceof CustomError) {
                return res.status(error.statusCode).json({ error: error.message })
            }

            res.status(500).json({ Error: "Internal Server Error" })
        }


    }

    loginUser = async (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body)

        if (error) return res.status(400).json({ error: error });

        try {
            const user = await this.authRepository.login(loginUserDto!);

            req.body.user = user;
            return res.status(200).json({
                message: `Login Successful, Mr ${user.name} `,
            })


        } catch (error) {
            if (error instanceof CustomError) {
                return res.status(error.statusCode).json({ error: error.message })
            }

            res.status(500).json({ Error: "Internal Server Error" })
        }
    }
}