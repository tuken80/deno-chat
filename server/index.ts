import { config } from "https://deno.land/x/dotenv/mod.ts";
import { acceptable, acceptWebSocket, WebSocket, isWebSocketCloseEvent } from 'https://deno.land/std/ws/mod.ts';
import { listenAndServe } from 'https://deno.land/std/http/server.ts'
import { v4 } from 'https://deno.land/std/uuid/mod.ts';

const conf = config();
const users = new Map<string, WebSocket>();

function broadcast(message: string, senderId?: string): void {
    if (!message) return;
    for (const s of users.values()) {
        s.send(senderId ? `[${senderId}]: ${message}` : message);
    }
}

async function handleSocket(ws: WebSocket) {
    const userId = v4.generate();
    console.log(userId);

    // Register user connection
    users.set(userId, ws);
    broadcast(`> User with the id ${userId} is connected`);

    // Wait for new messages
    try {
        for await (const event of ws) {
            console.log(event);

            if (typeof event === 'string') {
                broadcast(event, userId);
            }
            else if (isWebSocketCloseEvent(event)) {
                users.delete(userId);
                broadcast(`> User with the id ${userId} is disconnected`);
                break;
            }
        }
    } catch (err) {
        console.error(`failed to receive frame: ${err}`);

        if (!ws.isClosed) {
            await ws.close(1000).catch(console.error);
        }
    }
}

listenAndServe({ port: +conf.PORT }, async (req) => {
    if (req.method === 'GET' && req.url === '/ws') {
        if (acceptable(req)) {
            acceptWebSocket({
                conn: req.conn,
                bufReader: req.r,
                bufWriter: req.w,
                headers: req.headers,
            }).then(handleSocket);
        }
    }
});
