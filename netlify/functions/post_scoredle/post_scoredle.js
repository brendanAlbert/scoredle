require("dotenv").config();
const collectionname = process.env.VITE_MONGO_DB_COLLECTION_NAME;
const dbname = process.env.MONGO_DB_NAME;
const env = process.env.VITE_NODE_ENV;
const localDbUri = process.env.LOCAL_JSON_DB;

const postScoredle = async (db, document) => {
  let index = 0;
  console.log({
    document,
    index,
    scores: document[index].scores,
    wordle: document[index].wordle,
  });
  let result = await db.collection(collectionname).updateOne(
    //   // <filter>,
    //   // <update>,
    //   /*
    //       {
    //           upsert: true
    //       }

    //       */
    //   //      { year_month: document.year_month },
    //   //   { $push: { booms: { day: document.day, time: document.time } } }
    { date: document[index].date },
    {
      $set: {
        scores: document[index].scores,
        wordle: document[index].wordle ? document[index].wordle : "",
      },
    },

    {
      upsert: true,
    }
  );
  console.log({ document, result });

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

const clientPromise = require("../../mongodb-client/mongodb-client");

exports.handler = async function (event, context) {
  if (env === "prod") {
    // context.callbackWaitsForEmptyEventLoop = false;

    // const db = await connectToDatabase(uri);
    const client = await clientPromise;

    const db = await client.db(dbname);

    return postScoredle(db, JSON.parse(event.body));
  }

  if (env === "development") {
    const { writeFile } = require("fs/promises");

    let newScoredleState = JSON.parse(event.body);

    const newJsonDb = JSON.stringify(newScoredleState);

    await writeFile(new URL(localDbUri), newJsonDb);

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
