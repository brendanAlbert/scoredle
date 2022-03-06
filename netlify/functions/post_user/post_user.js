require("dotenv").config();
const collectionname = process.env.VITE_MONGO_DB_USERS_COLLECTION_NAME;
const dbname = process.env.MONGO_DB_NAME;
const env = process.env.VITE_NODE_ENV;
const localUserDbUri = process.env.LOCAL_JSON_USER_DB;

const postUser = async (db, document) => {
  console.log({ document, user: document.user, feed: document.feed });

  let result = await db.collection(collectionname).updateOne(
    { name: document.user },
    {
      $set: {
        name: document.user,
        feed: document.feed,
      },
    },

    {
      upsert: true,
    }
  );

  // if (result.modifiedCount == 0) {
  // result = await db.collection(collectionname).insertOne({
  //   year_month: document.year_month,
  //   booms: [{ day: document.day, time: document.time }],
  // });
  // }

  console.log({
    result,
  });

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: "added or updated document to/in collection!",
      result,
    }),
  };
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
  if (env === "prod") {
    const client = await clientPromise;

    const db = await client.db(dbname);

    return postUser(db, JSON.parse(event.body));
  }

  if (env === "development") {
    const { readFile, writeFile } = require("fs/promises");

    let result = await readFile(new URL(localUserDbUri));

    let { body } = event;

    const dbJson = JSON.parse(result);

    let rawobj = JSON.parse(body);

    const index = dbJson.findIndex((obj) => obj.user === rawobj.user);

    if (index > -1) {
      dbJson[index] = rawobj;
    }

    if (index == -1) {
      dbJson.push(rawobj);
    }

    const newJsonDb = JSON.stringify(dbJson);

    await writeFile(new URL(localUserDbUri), newJsonDb);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: "successfully updated db ✅",
      }),
    };
  }
};
