import { Router } from "https://deno.land/x/oak/mod.ts";
import handleChat from "./handlers/chat.ts";

const routing = new Router();

routing
    .get("/ws", handleChat);

export default routing;
