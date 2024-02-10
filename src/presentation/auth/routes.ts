import { Router } from "express";



export class AuthRoutes {
    static get routes(): Router {
        const router = Router();

        // All my app's routes
        router.post("/login", (req, res)=>{
            res.json({
             message: "Login..."   
            })
        });
        router.post("/register", (req, res)=>{
            res.json({
             message: "Register..."   
            })
        });

        


        return router
    }
}