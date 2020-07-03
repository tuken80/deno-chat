import { ServerRequest } from "https://deno.land/std/http/server.ts";
import { walk } from "https://deno.land/std/fs/mod.ts";
import handleChat from "./controllers/chat.ts";

export async function dispatchRouting(req: ServerRequest) {
    let controller = req.url.split('/')[2];

    if (controller === 'chat' && req.method === 'GET') handleChat(req);
    /*for await (const file of walk("./controllers")) {
        import(file.toString());
    }*/
}
