import { envs } from "./config/envs";
import { Server } from "./presentation/server";

(async ()=>{
    await main();
})();

async function main() {
    // todo: await database connection

    // todo: start server
    new Server({
        port: envs.PORT
    }).start();
}

