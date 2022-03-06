require("dotenv").config();
const userCollectionName = process.env.VITE_MONGO_DB_USERS_COLLECTION_NAME;
const dbname = process.env.MONGO_DB_NAME;
const env = process.env.VITE_NODE_ENV;
const localDbUri = process.env.LOCAL_JSON_USER_DB;

const getUsers = async (db) => {
    const userFeedPreferences = await db
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
};

// const clientPromise = require("../../mongodb-client/mongodb-client");

exports.handler = async function (event, context) {
    if (env === "prod") {
        const client = await clientPromise;

        const db = await client.db(dbname);

        return getUsers(db);
    }

    if (env === "development") {
        const { readFile } = require("fs/promises");
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
};
