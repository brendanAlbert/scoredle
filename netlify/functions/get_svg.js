const { schedule } = require("@netlify/functions");
const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");
require("dotenv").config();

const collectionname = process.env.VITE_MONGO_DB_COLLECTION_NAME;
const stagingCollectionName = process.env.VITE_MONGO_DB_STAGING_COLLECTION_NAME;

const dbname = process.env.MONGO_DB_NAME;
const env = process.env.VITE_NODE_ENV;
const localDbUri = process.env.LOCAL_JSON_DB;

const convertSvgToDataUri = async (rawSvg) => {
  let stringRawSvg = JSON.stringify(rawSvg);
  let encoded = stringRawSvg.replace(/\s+/g, " ");

  console.log({
    rawSvg,
    stringRawSvg,
    encoded,
  });

  // According to Taylor Hunt, lowercase gzips better ... my tiny test confirms this
  encoded = encoded.replaceAll("%", "%25");
  encoded = encoded.replaceAll("> <", "><"); // normalise spaces elements
  encoded = encoded.replaceAll("; }", ";}"); // normalise spaces css
  encoded = encoded.replaceAll("<", "%3c");
  encoded = encoded.replaceAll(">", "%3e");
  encoded = encoded.replaceAll('"', "'");
  encoded = encoded.replaceAll("#", "%23"); // needed for ie and firefox
  encoded = encoded.replaceAll("{", "%7b");
  encoded = encoded.replaceAll("}", "%7d");
  encoded = encoded.replaceAll("|", "%7c");
  encoded = encoded.replaceAll("^", "%5e");
  encoded = encoded.replaceAll("`", "%60");
  encoded = encoded.replaceAll("@", "%40");

  console.log({
    rawSvg,
    stringRawSvg,
    encoded,
  });

  // charset reportedly not needed ... I need to test before implementing
  // var uri = 'url("data:image/svg+xml;charset=UTF-8,' + encoded + '")';
  let uri = "data:image/svg+xml;charset=UTF-8," + encoded + "'";
  return uri;
};

const getSvg = async () => {
  const browser = await puppeteer.launch({
    args: [...chromium.args, "--disable-software-rasterizer", "--disable-gpu"],
    executablePath:
      process.env.CHROME_EXECUTABLE_PATH || (await chromium.executablePath),
    headless: true,
  });

  // const page = await browser.newPage();
  // await page.goto("https://worldle.teuteuf.fr");

  // Now we have the URL to the svg
  // let imgresult = await page.evaluate(() => {
  //   console.log({ document });

  //   return document.querySelector('img[alt="country to guess"]').src;
  // });

  // console.log({
  //   imgresult,
  // });

  const page2 = await browser.newPage();
  // Visit that URL and grab the SVG element

  // console.log({
  //   page2,
  // });

  let scrapedSvg;
  // await page2.goto(imgresult);
  await page2.goto("https://worldle.teuteuf.fr/images/countries/mg/vector.svg");
  console.log({
    target1: page2.target,
    target2: page2._target,
  });
  scrapedSvg = await page2.evaluate(() => {
    console.log({ document });
    return document.querySelector("svg");
  });

  console.log({
    scrapedSvg,
  });

  // With the svg element we need to convert it to a data:uri
  let encodedSvgDataUri = await convertSvgToDataUri(scrapedSvg);

  console.log({
    encodedSvgDataUri,
  });

  await browser.close();
  // return encodedSvgDataUri;
  return encodedSvgDataUri;
};

const updateTodaysScoredleWithSvg = async (db, document) => {
  let result;
  const countrySvgString = await getSvg();
  // const countrySvgString =
  //   "https://worldle.teuteuf.fr/images/countries/mg/vector.svg";

  console.log({
    countrySvgString,
  });

  if (env === "prod" || env === "staging") {
    result = await db
      .collection(env === "prod" ? collectionname : stagingCollectionName)
      .updateOne(
        { date: document[index].date },
        {
          $set: {
            svg: countrySvgString,
          },
        },
        {
          upsert: true,
        }
      );
  }

  if (env === "development") {
    // get today's scoredle object
    const { readFile, writeFile } = require("fs/promises");
    const json = JSON.parse(await readFile(new URL(localDbUri)));

    // add today's countrySvgString to today's scoredle object
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
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      status: "Ok",
    }),
  };
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
    // return postScoredle(db, JSON.parse(event.body));
  }

  if (env === "development") {
    // const { readFile } = require("fs/promises");

    // let newScoredleState = JSON.parse(event.body);
    // const json = JSON.parse(await readFile(new URL(localDbUri)));
    // const newJsonDb = JSON.stringify(newScoredleState);

    // await writeFile(new URL(localDbUri), newJsonDb);

    return await updateTodaysScoredleWithSvg(null, JSON.parse(event.body));

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

module.exports.handler = schedule("5 0 * * *", handler);
