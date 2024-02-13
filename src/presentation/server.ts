import express, { Router } from 'express';

interface Options {
    port?: number;
    routes: Router;
}

export class Server {

    public readonly app = express();
    private readonly port: number;
    private readonly routes: Router;

    constructor(options: Options) {
        const {port = 4000, routes} = options;
        this.port = port;
        this.routes = routes;
    }
    

    async start(){
        // Middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true})); // x-www-form-urlencoded

        // Routes
        this.app.use(this.routes);
        
        // Server start
        this.app.listen(this.port, ()=>{
            console.log(`Server running on port ${this.port}`);
        })
    }
}