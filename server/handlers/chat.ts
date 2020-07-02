import { acceptable, acceptWebSocket } from 'https://deno.land/std/ws/mod.ts';
import { handleSocket } from "../services/socket.ts";

export default async ({ request, response }: any) => {
    if (acceptable(request)) {
        acceptWebSocket({
            conn: request.conn,
            bufReader: request.r,
            bufWriter: request.w,
            headers: request.headers,
        }).then(handleSocket)
    }
};
