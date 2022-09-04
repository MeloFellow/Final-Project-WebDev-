const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const realEstate = require("./data/RealEstate.json");
const tools = require("./data/Tools.json");
const toys = require("./data/Toys.json");
const vehicles = require("./data/Vehicles.json");

const batchImport = async (dbName, itemName, collectionName) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);

  try {
    // connect to the client
    await client.connect();

    const db = client.db(dbName);

    const result = await db.collection(collectionName).insertMany(itemName);

    console.log(itemName);
    console.log(result);
  } catch (err) {
    console.log(err.stack);
    console.log("Error");
  } finally {
    client.close();
  }
};

batchImport("Numelo", realEstate, "Items");
batchImport("Numelo", tools, "Items");
batchImport("Numelo", toys, "Items");
batchImport("Numelo", vehicles, "Items");
