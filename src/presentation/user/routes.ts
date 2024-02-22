import { Router } from "express";
import { UserController } from "./controller";



export class UserRoutes {
    static get routes(): Router {
        const router = Router();

        const controller = new UserController();

        router.get("/", controller.getUsers);

        return router
    }
}