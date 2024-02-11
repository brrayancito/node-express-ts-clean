import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(async ()=>{
    await main();
})();

async function main() {
    // todo: await database connection

    // Start server
    new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    }).start();
}

