"use server";

import { MongoClient, ServerApiVersion } from "mongodb";

//check if db uri exists
const dbUri = process.env.DB_URI;
if (!dbUri) {
  console.log("DB_URI does not exist");
}

//create new MongoClient
const client = new MongoClient(dbUri, {
  ServerApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//connect to database
async function getDb(dbName) {
  await client.connect();
  console.log("Connected to database");
  return client.db(dbName);
}

//function to get collections
export async function getCollection(collectionName) {
  const db = await getDb("mynextapp");
  if (db) {
    return db.collection(collectionName);
  }
}
