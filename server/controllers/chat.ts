import { ServerRequest } from "https://deno.land/std/http/server.ts";
import { acceptable, acceptWebSocket } from 'https://deno.land/std/ws/mod.ts';

import { handleSocket } from "../services/socket.ts";

export let routing = {
    "socket": (req: ServerRequest) => {
        if (acceptable(req)) {
            return acceptWebSocket({
                conn: req.conn,
                bufReader: req.r,
                bufWriter: req.w,
                headers: req.headers,
            }).then(handleSocket);
        }
    }
};
