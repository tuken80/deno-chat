import { DenonConfig } from "https://deno.land/x/denon/mod.ts";

const config: DenonConfig = {
  scripts: {
    dev: {
      cmd: 'index.ts',
      desc: 'Chat server',
      allow: [
        'env',
        'read',
        'write',
        'net'
      ],
      log: 'info'
    },
  },
};

export default config;
