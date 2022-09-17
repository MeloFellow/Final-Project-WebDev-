const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const cors = require("cors");
const { uploadFile, getFileStream } = require("../s3");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const ObjectID = require("mongodb").ObjectID;

// EDIT USER INFO

const editUser = async (req, res) => {
  const { file } = req;
  // console.log("Hello Conneted");
  const profileId = req.params._id;
  // console.log("requested body", req.body);
  const client = new MongoClient(MONGO_URI, options);
  const adObject = JSON.parse(JSON.stringify(req.body));
  // console.log("AD object first name", adObject.firstName);
  try {
    await client.connect();
    const result = await uploadFile(file);
    const profileData = {
      firstName: adObject.firstName,
      lastName: adObject.lastName,
      email: adObject.email,
      phonenumber: adObject.phonenumber,
      description: adObject.description,
      location: adObject.location,
      imageSrc: result.Key,
    };
    const db = client.db("Numelo");

    const currentProdileInfo = await db
      .collection("Users")
      .findOne({ _id: ObjectId(profileId) });

    const UpdatedUser = await db.collection("Users").updateOne(
      { _id: ObjectId(profileId) },
      {
        $set: {
          firstName: adObject.firstName,
          lastName: adObject.lastName,
          email: adObject.email,
          phonenumber: adObject.phonenumber,
          location: adObject.location,
          imageSrc: result.Key,
        },
      }
    );

    res.status(200).json({
      status: 200,
      data: UpdatedUser,
      message: "Your reservation has been updated",
    });

    client.close();
    console.log("disconnected!");
  } catch (err) {
    console.log("Error: ", err);
  }
};

// POST ITEM TO DATABASE

const postItem = async (req, res) => {
  const { file } = req;
  const { name } = req;
  const { email } = req.body;
  // console.log({ file });

  const adObject = JSON.parse(JSON.stringify(req.body));
  // console.log("AD object", adObject);
  const test = req.body;

  const client = new MongoClient(MONGO_URI, options);
  try {
    const result = await uploadFile(file);
    // console.log("REQ # 2", req);
    // console.log("hello 1");
    await client.connect();
    // console.log("hello 2");
    const itemData = {
      name: adObject.name,
      price: adObject.price,
      location: adObject.location,
      category: adObject.category,
      imageSrc: result.Key,
      description: adObject.description,
      condition: adObject.condition,
      available: adObject.available,
      owner: adObject.owner,
    };

    const db = client.db("Numelo");
    const itemResult = await db.collection("Items").insertOne(itemData);

    res.status(200).json({
      status: 200,
      data: itemData,
      message: `Item Created!`,
    });
    client.close();
  } catch (err) {
    console.log("Error: ", err);
  }
};

// GET ALL THE PRODUCTS FROM THE DATABASE

const getAllProducts = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("Numelo");
    const result = await db.collection("Items").find().toArray();
    // console.log("RESULT", result);
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

//GET THE ALL USERS

const getAllUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("Numelo");
    const result = await db.collection("Users").find().toArray();
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
  console.log("trying to get user info");
  try {
    await client.connect();
    const db = client.db("Numelo");

    const userId = req.params._id;

    const userInfo = await db
      .collection("Users")
      .findOne({ _id: ObjectId(userId) });

    const userItems = userInfo.items;

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

// Search for a product

const findProducts = async (req, res) => {
  const query = req.params.query;
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("Numelo");
    const result = await db
      .collection("Items")
      // Find the items which their name includes the search term(query), "options i" is for case insensitivity
      .find({ name: { $regex: query, $options: "i" } })
      .toArray();

    client.close();

    // const editedResult = result.length > 0 && addIntPriceKey(result);

    result.length > 0
      ? res.status(200).json({
          status: 200,
          data: result,
          message: `Products found!`,
        })
      : res.status(404).json({
          status: 404,
          data: `search term: ${query}`,
          message: `Couldn't find any product!`,
        });
  } catch (err) {
    console.log("Error: ", err);
  }
};

//CREATE A NEW USER IN DATABASE AND VALIDATE IF IT ALREADY EXISTS

const createUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("Numelo");

    const requestedEmail = req.body.email;

    const isEmail = await db
      .collection("Users")
      .findOne({ email: req.body.email });

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

// GET ALL PROFILE ITEMS

const getUserItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  const db = client.db("Numelo");
  const userId = req.params._id;

  try {
    await client.connect();
    // const result = await db.collection("Items").findOne({ owner: userId });
    const result = await db
      .collection("Items")
      .find({ owner: userId })
      .toArray();
    client.close();

    res.json({
      status: 200,
      data: result,
      message: "The USERS",
    });
  } catch (err) {
    console.log("Error: ", err);
  }
};

// GET A PRODUCT INFORMATION FROM DATABASE

const getItem = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  const _id = req.params._id;
  const db = client.db("Numelo");

  try {
    await client.connect();
    console.log("connected");
    const result = await db.collection("Items").findOne({ _id: ObjectId(_id) });

    client.close();

    result
      ? res.status(200).json({
          status: 200,
          data: result,
          message: `Item found!`,
        })
      : res.status(404).json({
          status: 404,
          data: `_id: ${_id}`,
          message: `Couldn't find the item!`,
        });
  } catch (err) {
    console.log("Error: ", err);
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
    // console.log("RESULT", result);
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
  postItem,
  getItem,
  editUser,
  getUserItems,
  findProducts,
};
