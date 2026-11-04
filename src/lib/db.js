import "server-only";
import { MongoClient } from "mongodb";

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
