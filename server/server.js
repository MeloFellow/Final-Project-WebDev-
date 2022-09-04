"use strict";

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const PORT = 8000;

const {
  getAllProducts,
  createUser,
  getUser,
  getRealEstate,
  getTools,
  getToys,
  getVehicles,
  findItem,
} = require("./handlers/handlers");

const app = express();
// What does this actually mean
// .use(function (req, res, next) {
//   res.header(
//     "Access-Control-Allow-Methods",
//     "OPTIONS, HEAD, GET, PUT, POST, DELETE"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// })
// What does this actually mean
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//   .use("/", express.static(__dirname + "/"))

// app.get("/images/:key", function(req, res)

// {
//   _id: uuid, key;
// }
// app.get("/api/get-user/:_id", getUser);
app.post("/api/create-user", createUser);
app.get("/api/get-all-products", getAllProducts);
// app.get("/api/get-realEstate", getRealEstate);
// app.get("/api/get-tools", getTools);
// app.get("/api/get-toys", getToys);
// app.get("/api/get-vehicles", getVehicles);
// app.get("/api/find-item/:query", findItem);
app.listen(PORT, () => console.info(`Listening on port ${PORT}`));
