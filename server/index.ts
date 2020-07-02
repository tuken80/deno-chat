import { config } from "https://deno.land/x/dotenv/mod.ts";
import app from "./app.ts";

const conf = config();

app.listen(`${conf.HOST}:${conf.PORT}`);
