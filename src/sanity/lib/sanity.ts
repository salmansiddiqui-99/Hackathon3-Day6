import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "heprv8oo",  // Replace with your actual project ID
  dataset: "production",         // Or your dataset name
  useCdn: true,                  // Use CDN for faster read requests
  apiVersion: "2025-01-13",       // Use a recent API version
});

