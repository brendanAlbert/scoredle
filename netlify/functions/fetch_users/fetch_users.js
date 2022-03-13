require("dotenv").config();
const userCollectionName = process.env.VITE_MONGO_DB_USERS_COLLECTION_NAME;
const stagingUserCollectionName =
  process.env.VITE_MONGO_DB_STAGING_USERS_COLLECTION_NAME;
const dbname = process.env.MONGO_DB_NAME;
const env = process.env.VITE_NODE_ENV;
const localDbUri = process.env.LOCAL_JSON_USER_DB;

const getUsers = async (db) => {
  let userFeedPreferences;

  if (env === "prod") {
    userFeedPreferences = await db
      .collection(userCollectionName)
      .find({})
      .toArray();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userFeedPreferences),
    };
  }

  if (env === "staging") {
    userFeedPreferences = await db
      .collection(stagingUserCollectionName)
      .find({})
      .toArray();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userFeedPreferences),
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

    return getUsers(db);
  }

  if (env === "development") {
    const { readFile } = require("fs/promises");

    const { httpMethod } = event;

    if (httpMethod === "POST") {
      const json = JSON.parse(await readFile(new URL(localDbUri)));
      const username = event.body;
      const index = json.findIndex((obj) => obj.user === username);

      let userFeed = [];

      if (index > -1) {
        userFeed = json[index];
      }

      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userFeed),
      };
    }

    if (httpMethod === "GET") {
      let result = JSON.parse(await readFile(new URL(localDbUri)));

      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      };
    }
  }
};
