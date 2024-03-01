import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { UserMapper } from "../../infraestructure";


export class AuthMiddleware {

    static validateJwt = async (req: Request, res: Response, next: NextFunction) => {

        const authorization = req.header('Authorization');
        if (!authorization) return res.status(401).json({ message: 'Unauthorized' });
        if (!authorization.startsWith('Bearer ')) return res.status(401).json({ message: 'Invalid Token' });

        const token = authorization.split(' ')[1] || '';

        try {

            const payload = await JwtAdapter.validateToken<{ id: string }>(token);
            if (!payload) return res.status(401).json({ message: 'Invalid Token' });

            const user = await UserModel.findById(payload.id);
            if (!user) return res.status(401).json({ message: 'Invalid Token' });



            req.body.user = UserMapper.userEntityFromObject(user);

            next();
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' })
        }

    }
}