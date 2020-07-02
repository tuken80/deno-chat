import { Application } from "https://deno.land/x/oak/mod.ts";

import router from "./routing.ts";
import notFound from "./middlewares/not-found.ts";
import error from "./middlewares/error.ts";

const app = new Application();

app.use(error);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(notFound);

export default app;

