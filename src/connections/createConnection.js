import { createConnection } from "mysql2/promise";
import "dotenv/config";

const { INFOTEP_DB, INFOTEP_HOST,INFOTEP_USER, INFOTEP_PASS } = process.env;

export default async function getConnect(){
    try {
        const connection = await createConnection({
            host:  INFOTEP_HOST,
            user: INFOTEP_USER,
            database: INFOTEP_DB,
            password:INFOTEP_PASS
        });

        return connection;

    } catch (error) {
        return error.message;
    }
}