import { envs } from "./config/envs";
import { MongoDatabase } from "./data/mongodb";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(async () => {
    await main();
})();

async function main() {
    // Database connection
    await MongoDatabase.connect({
        mongodbUrl: envs.MONGO_DATABASE_URL,
        dbName: envs.MONGO_DATABASE_NAME
    })

    // Start server
    new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    }).start();
}

