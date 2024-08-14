import { MongoClient } from 'mongodb';
// declare global {
//   var mongodb: any; // This must be a `var` and not a `let / const`
// }

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// let cached = global.mongodb;
//
// if (!cached) {
//   cached = global.mongodb = { conn: null, promise: null, client: null };
// }
let connection: MongoClient;
async function getMongoDB() {
  if (connection) {
    return connection;
  }
  try {
    const client = new MongoClient(MONGODB_URI!);
    connection = await client.connect();
    return connection;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export default getMongoDB;
