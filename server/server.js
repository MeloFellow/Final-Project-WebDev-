"use strict";

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const PORT = 8000;
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const app = express();
const http = require("http");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { uploadFile, getFileStream } = require("./s3");

const {
  getAllProducts,
  createUser,
  getUserInfo,
  getAllUsers,
  getRealEstate,
  getTools,
  getToys,
  getVehicles,
  postItem,
  getItem,
  editUser,
  getUserItems,
  findProducts,
} = require("./handlers/handlers");

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// this endpoints will request the image from S3
app.get("/images/:key", async (req, res) => {
  console.log(req.params);
  try {
    const { key } = await req.params;
    console.log(key);
    const readStream = getFileStream(key);
    readStream.pipe(res);
  } catch {
    return res.status(404);
  }
});

// CREATE HANDLER TO POST ITEM IMAGE KEY, WILL BE MOVED TO HANDLERS
app.post("/api/post-item", upload.single("image"), postItem);
app.get("/api/get-user-items/:_id", getUserItems);
app.post("/api/create-user", createUser);
app.get("/api/get-users/", getAllUsers);
app.get("/api/get-user-info/:_id", getUserInfo);
app.get("/api/get-all", getAllProducts);
app.get("/api/get-realestate", getRealEstate);
app.get("/api/get-tools", getTools);
app.get("/api/get-toys", getToys);
app.get("/api/get-vehicles", getVehicles);
app.get("/api/get-item/:_id", getItem);
app.post("/api/edit-user/:_id", upload.single("image"), editUser);
app.get("/api/find-products/:query", findProducts);
app.listen(PORT, () => console.info(`Listening on port ${PORT}`));
