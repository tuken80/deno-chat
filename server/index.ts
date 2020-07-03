import { DB } from "./services/db.ts";
import { launchServer } from "./services/server.ts";

DB.init().then(() => launchServer());
