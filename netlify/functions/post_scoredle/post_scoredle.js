require("dotenv").config();
const collectionname = process.env.VITE_MONGO_DB_COLLECTION_NAME;
const stagingCollectionName = process.env.VITE_MONGO_DB_STAGING_COLLECTION_NAME;
const errorLogCollection = process.env.ERROR_LOG_COLLECTION;

const dbname = process.env.MONGO_DB_NAME;
const env = process.env.VITE_NODE_ENV;
const localDbUri = process.env.LOCAL_JSON_DB;
const admin = process.env.VITE_ADMIN;

const postScoredle = async (db, document) => {
    let result;
    if (document.user === admin) {
        result = await db
            .collection(env === "prod" ? collectionname : stagingCollectionName)
            .updateOne(
                { date: document.date },
                {
                    $set: {
                        worldle: document.worldle ?? "",
                        wordle: document.wordle ?? "",
                        word: document.word ?? "",
                        svg: document.svg ?? "",
                        country: document.country ?? "",
                        region: document.region ?? "",
                        state: document.state ?? "",
                        statele: document.statele ?? "",
                        state_svg: document.state_svg ?? "",
                        de_state: document.de_state ?? "",
                        de_svg: document.de_svg ?? "",
                    },
                },
                {
                    upsert: true,
                }
            );
    }

    const user = document.user;

    let userScoreObject = document.scores?.filter(
        (uso) => uso.name === user
    )[0];

    const todaysGamesObject = await db
        .collection(env === "prod" ? collectionname : stagingCollectionName)
        .findOne({ date: document.date });

    const { scores: latestScoresFromDB } = todaysGamesObject ?? {};

    const filteredUserScoreObjFromDB = latestScoresFromDB?.filter(
        (s) => s.name === user
    )[0];

    const newUserScoreObj = {
        ...filteredUserScoreObjFromDB,
        ...userScoreObject,
    };

    const scoresSansUsersObjList = latestScoresFromDB?.filter(
        (s) => s.name !== user
    );

    const newScores =
        Object.keys(newUserScoreObj).length > 0
            ? [...(scoresSansUsersObjList ?? []), newUserScoreObj]
            : [];

    let result2 = await db
        .collection(env === "prod" ? collectionname : stagingCollectionName)
        .updateOne(
            { date: document.date },
            {
                $set: {
                    scores: newScores,
                },
            },
            { upsert: true }
        );

    let year_month =
        new Date().getFullYear() + "/" + (new Date().getMonth() + 1);

    await db.collection(errorLogCollection).updateOne(
        { year_month: year_month },
        {
            $push: {
                logs: {
                    entry: `${
                        document.user
                    } ~ [${new Date()}] - ${JSON.stringify(
                        result
                    )} | ${JSON.stringify(result2)} | ${JSON.stringify(
                        document
                    )}`,
                },
            },
        },
        {
            upsert: true,
        }
    );

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

        return postScoredle(db, JSON.parse(event.body));
    }

    if (env === "development") {
        const { readFile, writeFile } = require("fs/promises");

        let newScoredleDateObject = JSON.parse(event.body);

        console.log({ newScoredleDateObject });

        const jsondb = JSON.parse(await readFile(new URL(localDbUri)));

        let index = jsondb.findIndex(
            (dateObject) => dateObject.date === newScoredleDateObject.date
        );

        if (index > -1) {
            jsondb[index] = newScoredleDateObject;
        }

        if (index === -1) {
            jsondb.push(newScoredleDateObject);
        }

        await writeFile(new URL(localDbUri), JSON.stringify(jsondb));

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
