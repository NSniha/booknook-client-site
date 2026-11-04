import "server-only";
import dns from "node:dns/promises";
import { MongoClient } from "mongodb";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

export function getDatabase() {
  if (!process.env.MONGODB_URI)
    throw new Error(
      "Set MONGODB_URI in client/.env.local to enable authentication.",
    );
  if (!globalThis.booknookMongoClient) {
    globalThis.booknookMongoClient = new MongoClient(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
    });
  }
  const client = globalThis.booknookMongoClient;
  return { client, db: client.db(process.env.MONGODB_DB || "booknook") };
}
