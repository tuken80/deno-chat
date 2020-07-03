import { Client } from "https://deno.land/x/mysql/mod.ts";
import { walk } from "https://deno.land/std/fs/walk.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const conf = config();

export class DB {
    static client: Client;

    static async connect() {
        new Client()
            .connect({
                hostname: conf.DBHOST,
                username: conf.DBUSER,
                password: conf.DBPASS,
                port: +conf.DBPORT,
                db: conf.DBNAME,
                poolSize: 1,
            })
            .then((c: Client) => DB.client = c);
    }

    static async init() {
        DB.connect()
            .then(() => DB.exec('USE deno'))
            .then(() => walk('../models'))
            .then(files => console.log(files));
    }

    static async destroy() {
        DB.client.close();
    }

    static async exec(query: string) {
        return DB.client.execute(query);
    }
};
