import 'dotenv/config';
import { get } from 'env-var';



export const envs = {

    PORT: get('PORT').required().asPortNumber(),

    MONGO_DATABASE_URL: get('MONGO_DATABASE_URL').required().asString(),
    MONGO_DATABASE_NAME: get('MONGO_DATABASE_NAME').required().asString(),
}