const express = require("express");
const app = express();
const initdDb = require("../config/db.js");

//POST /shorten: Recibe una URL larga y devuelve una URL corta.
app.post("/shorten", (req, res) => {
  res.send("URL corta");
});
