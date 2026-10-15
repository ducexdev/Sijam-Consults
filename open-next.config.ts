import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const config = defineCloudflareConfig({
  incrementalCache: "dummy",
  tagCache: "dummy",
  queue: "dummy",
  cachePurge: "dummy",
});

export default {
  ...config,
  buildCommand: "npm run build:next",
};
