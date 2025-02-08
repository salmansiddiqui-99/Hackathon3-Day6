import { createClient } from "@sanity/client";
export const client = createClient({
  projectId: "heprv8oo",
  dataset: "production",
  apiVersion: "2025-01-13",
  useCdn: true,
});
