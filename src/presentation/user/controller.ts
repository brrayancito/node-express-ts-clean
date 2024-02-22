import { Request, Response } from "express";
import { CustomError, UserRepository } from "../../domain"
import { UserRepositoryImpl } from "../../infraestructure"




export class UserController {

    constructor(
        private readonly UserRepository: UserRepository = new UserRepositoryImpl
    ) { }

    getUsers = async (req: Request, res: Response) => {

        try {
            const users = await this.UserRepository.getUsers();

            return res.status(200).json({
                total: users.length,
                users
            })

        } catch (error) {

            if (error instanceof CustomError) {
                return res.status(error.statusCode).json({ error: error.message })
            }

            res.status(500).json({ Error: "Internal Server Error" })
        }


    }

}