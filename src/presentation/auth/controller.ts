import { Request, Response } from "express";


export class AuthController {

    constructor() {}

    registerUser = (req: Request, res: Response) => {
        res.json({
            message: "registerUser method"
        })
    }

    loginUser = (req: Request, res: Response) => {
        res.json({
            message: "loginUser method"
        })
    }
}