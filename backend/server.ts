import { router } from "./router";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

let port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", router);

const main = async () => {
  try {
    app.listen(port, () => {
      console.log("Listening Port " + port);
    });
  } catch (e) {
    console.log(e);
  }
};

main();
