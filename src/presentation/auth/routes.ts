import { Router } from "express";
import { AuthController } from "./controller";
import { AuthRepository } from "../../domain";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infraestructure";



export class AuthRoutes {
    static get routes(): Router {
        const router = Router();
        const authDatasource = new AuthDatasourceImpl();
        const authRepository = new AuthRepositoryImpl(authDatasource);
        const controller = new AuthController(authRepository);

        // All my app's routes
        router.post("/login", controller.loginUser);
        router.post("/register", controller.registerUser);




        return router
    }
}