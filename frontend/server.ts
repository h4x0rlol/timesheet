const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(__dirname);
  console.log("Listening Port " + port);
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE, PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "accept, content-type, if-modified-since"
  );
  next();
});

app.use(express.static(__dirname + "/dist"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});
