const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

// GET ALL THE PRODUCTS FROM THE DATABASE

const getAllProducts = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("Numelo");
    const result = await db.collection("Items").find().toArray();
    console.log("RESULT", result);
    console.log("Connected to MongoDB");
    client.close();
    res.status(200).json({
      status: 200,
      data: result,
      message: "You connected successfully",
    });
  } catch (err) {
    console.log("Error connecting", err);
  }
};

//GET THE ALL USERS PROFILE INFO

const getAllUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("Numelo");
    const result = await db.collection("Users").find().toArray();
    console.log("Connected to MongoDB");
    console.log("USERS", result);
    client.close();
    res.json({ status: 200, data: result, message: "The USERS" });
    client.close();
  } catch (err) {
    console.log("Error connecting", err);
  }
};

//GET THE ALL USERS PROFILE INFO

const getUserInfo = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("Numelo");

    const userId = req.params._id;
    console.log("These are the req params", userId);
    const userInfo = await db
      .collection("Users")
      .findOne({ _id: ObjectId(userId) });

    const userItems = userInfo.items;
    console.log("Connected to MongoDB");
    console.log("USER INFO", userInfo);
    console.log("user items", userItems);
    client.close();
    res.json({
      status: 200,
      data: { userInfo, userItems },
      message: "The USERS",
    });
    client.close();
  } catch (err) {
    console.log("Error connecting", err);
  }
};

//CREATE A NEW USER IN DATABASE AND VALIDATE IF IT ALREADY EXISTS

const createUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  try {
    console.log("req body", req.body);
    await client.connect();
    const db = client.db("Numelo");
    console.log("Connected to MongoDB");
    const requestedEmail = req.body.email;

    const isEmail = await db
      .collection("Users")
      .findOne({ email: req.body.email });

    console.log("is Email?", isEmail);

    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    };
    if (isEmail === null) {
      const user = await db.collection("Users").insertOne(newUser);
      res.status(201).json({
        status: 201,
        data: newUser,
        message: "You signed up successfully",
      });
      client.close();
    } else {
      res.status(201).json({
        status: 201,
        data: isEmail,
        message: "You already have an account",
      });
      client.close();
    }
  } catch (err) {
    console.log("Error connecting", err);
  }
};

const getRealEstate = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  try {
    console.log("Connected to MongoDB");
    await client.connect();
    const db = client.db("Numelo");
    const result = await db
      .collection("Items")
      .find({ category: "Real Estate" })
      .toArray();
    console.log("RESULT", result);
    client.close();
    res.status(200).json({
      status: 200,
      data: result,
      message: "You connected successfully",
    });
  } catch (err) {
    console.log("Error connecting", err);
  }
};

const getTools = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  try {
    console.log("Connected to MongoDB");
    await client.connect();
    const db = client.db("Numelo");
    const result = await db
      .collection("Items")
      .find({ category: "Tools" })
      .toArray();
    console.log("RESULT", result);
    client.close();
    res.status(200).json({
      status: 200,
      data: result,
      message: "You connected successfully",
    });
  } catch (err) {
    console.log("Error connecting", err);
  }
};

const getToys = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  try {
    console.log("Connected to MongoDB");
    await client.connect();
    const db = client.db("Numelo");
    const result = await db
      .collection("Items")
      .find({ category: "Toys" })
      .toArray();
    console.log("RESULT", result);
    client.close();
    res.status(200).json({
      status: 200,
      data: result,
      message: "You connected successfully",
    });
  } catch (err) {
    console.log("Error connecting", err);
  }
};

const getVehicles = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  try {
    console.log("Connected to MongoDB");
    await client.connect();
    const db = client.db("Numelo");
    const result = await db
      .collection("Items")
      .find({ category: "Vehicles" })
      .toArray();
    console.log("RESULT", result);
    client.close();
    res.status(200).json({
      status: 200,
      data: result,
      message: "You connected successfully",
    });
  } catch (err) {
    console.log("Error connecting", err);
  }
};

module.exports = {
  getAllProducts,
  getAllUsers,
  createUser,
  getUserInfo,
  getRealEstate,
  getTools,
  getToys,
  getVehicles,
};
