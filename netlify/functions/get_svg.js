const { schedule } = require("@netlify/functions");
const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");
require("dotenv").config();
const svgToMiniDataURI = require("mini-svg-data-uri");

const collectionname = process.env.VITE_MONGO_DB_COLLECTION_NAME;
const stagingCollectionName = process.env.VITE_MONGO_DB_STAGING_COLLECTION_NAME;

const dbname = process.env.MONGO_DB_NAME;
const env = process.env.VITE_NODE_ENV;
const localDbUri = process.env.LOCAL_JSON_DB;

const getSvg = async () => {
  const browser = await puppeteer.launch({
    args: [...chromium.args, "--disable-software-rasterizer", "--disable-gpu"],
    executablePath:
      process.env.CHROME_EXECUTABLE_PATH || (await chromium.executablePath),
    headless: true,
  });

  const page = await browser.newPage();
  await page.goto("https://worldle.teuteuf.fr");

  let imgresult = await page.evaluate(() => {
    return document.querySelector('img[alt="country to guess"]').src;
  });

  const page2 = await browser.newPage();

  let scrapedSvg;
  await page2.goto(imgresult);
  scrapedSvg = await page2.evaluate(
    () => document.querySelector("svg").outerHTML
  );

  let encodedSvgDataUri = svgToMiniDataURI(scrapedSvg);

  await browser.close();
  return encodedSvgDataUri;
};

const updateTodaysScoredleWithSvg = async (db, document) => {
  let result;
  const countrySvgString = await getSvg();

  const date = new Date().toDateString();

  if (env === "prod" || env === "staging") {
    try {
      result = await db
        .collection(env === "prod" ? collectionname : stagingCollectionName)
        .updateOne(
          { date },
          {
            $set: {
              svg: countrySvgString,
            },
          },
          {
            upsert: true,
          }
        );

      return {
        statusCode: 200,
        body: JSON.stringify({
          status: "Ok",
        }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          status: "Ok",
          error,
        }),
      };
    }
  }

  if (env === "development") {
    const { readFile, writeFile } = require("fs/promises");
    const json = JSON.parse(await readFile(new URL(localDbUri)));

    const date = new Date().toDateString();
    const index = json.findIndex(
      (scoredleObject) => scoredleObject.date === date
    );

    if (index === -1) {
      let newScoredleObject = {
        svg: countrySvgString,
        date,
        scores: [],
        wordle: "",
        worldle: "",
      };
      json.push(newScoredleObject);
    }

    if (index > -1) {
      json[index].svg = countrySvgString;
    }

    const newJsonDb = JSON.stringify(json);
    await writeFile(new URL(localDbUri), newJsonDb);

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "Ok",
      }),
    };
  }
};

let clientPromise;

const setupMongoConnection = () => {
  const { MongoClient } = require("mongodb");
  const uri = process.env.VITE_MONGO_URI;
  const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };
  let client;
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
};

setupMongoConnection();

const handler = async function (event, context) {
  if (env === "prod" || env === "staging") {
    const client = await clientPromise;

    const db = await client.db(dbname);

    return await updateTodaysScoredleWithSvg(db, JSON.parse(event.body));
  }

  if (env === "development") {
    return await updateTodaysScoredleWithSvg(null, JSON.parse(event.body));
  }
};

module.exports.handler = schedule("10 0 * * *", handler);
