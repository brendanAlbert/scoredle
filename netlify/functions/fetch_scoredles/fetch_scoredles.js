require("dotenv").config();
const collectionname = process.env.VITE_MONGO_DB_COLLECTION_NAME;
const stagingCollectionName = process.env.VITE_MONGO_DB_STAGING_COLLECTION_NAME;
const dbname = process.env.MONGO_DB_NAME;
const env = process.env.VITE_NODE_ENV;
const localDbUri = process.env.LOCAL_JSON_DB;

const getScoredles = async (db) => {
  let scoredles;

  if (env === "prod") {
    scoredles = await db.collection(collectionname).find({}).toArray();
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scoredles),
    };
  }

  if (env === "staging") {
    scoredles = await db.collection(stagingCollectionName).find({}).toArray();
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scoredles),
    };
  }
};

const { MongoClient } = require("mongodb");

require("dotenv").config();

const uri = process.env.VITE_MONGO_URI;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
let clientPromise;

if (process.env.VITE_NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }

  clientPromise = global._mongoClientPromise;
} else {
  // Else in production it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

exports.handler = async function (event, context) {
  if (env === "prod" || env === "staging") {
    const client = await clientPromise;

    const db = await client.db(dbname);

    return getScoredles(db);
  }

  if (env === "development") {
    const { readFile } = require("fs/promises");
    const json = JSON.parse(await readFile(new URL(localDbUri)));
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    };
  }
};
