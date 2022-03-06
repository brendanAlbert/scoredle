require("dotenv").config();
const collectionname = process.env.VITE_MONGO_DB_COLLECTION_NAME;
const dbname = process.env.MONGO_DB_NAME;
const env = process.env.VITE_NODE_ENV;
const localDbUri = process.env.LOCAL_JSON_DB;

const getScoredles = async (db) => {
    const scoredles = await db.collection(collectionname).find({}).toArray();

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(scoredles),
    };
};

// const clientPromise = require("../../mongodb-client/mongodb-client");

exports.handler = async function (event, context) {
    if (env === "prod") {
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
