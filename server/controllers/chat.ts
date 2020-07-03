import { ServerRequest } from "https://deno.land/std/http/server.ts";
import { acceptable, acceptWebSocket } from 'https://deno.land/std/ws/mod.ts';

import { handleSocket } from "../socket.ts";

export default async function(req: ServerRequest) {
    if (acceptable(req)) {
        acceptWebSocket({
            conn: req.conn,
            bufReader: req.r,
            bufWriter: req.w,
            headers: req.headers,
        }).then(handleSocket);
    }
}
