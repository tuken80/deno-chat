import { ServerRequest } from "https://deno.land/std/http/server.ts";

export async function dispatchRouting(req: ServerRequest) {
    let path = req.url.split('/');

    import(`./controllers/${path[2]}.ts`).then(ctrl => ctrl.routing[path[3]](req));
}
