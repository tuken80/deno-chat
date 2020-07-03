import { DB } from "../services/db.ts";

export class User {
    static async init() {
        return DB.client
            .exec('DROP TABLE IF EXISTS users')
            .then(() => DB.client.exec(`
                CREATE TABLE users (
                    id int(11) NOT NULL AUTO_INCREMENT,
                    name varchar(100) NOT NULL,
                    created_at timestamp not null default current_timestamp,
                    PRIMARY KEY (id)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
            `));
    }
}
