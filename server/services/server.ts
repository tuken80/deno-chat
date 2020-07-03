import { listenAndServe } from "https://deno.land/std/http/server.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

import { dispatchRouting } from "./router.ts";

export function launchServer() {
    listenAndServe({ port: +config().PORT }, dispatchRouting);
}
