import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "0akh2hu2",
  dataset: "production",
  apiVersion: "2026-05-15",
  useCdn: false,
});