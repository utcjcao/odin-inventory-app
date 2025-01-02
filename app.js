const path = require("path");
const { fileURLToPath } = require("url");
const express = require("express");
const {
  allMessagesGet,
  newMessagePost,
  newMessageGet,
  getMessage,
} = require("./controllers/messageController");
const { populatedb } = require("./db/populatedb");

const app = new express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  await allMessagesGet(req, res);
  console.log("hello");
});

app.get("/new", async (req, res) => {
  await newMessageGet(req, res);
});

app.post("/new", async (req, res) => {
  await newMessagePost(req, res);
});

app.post("/message/:id", async (req, res) => {
  await getMessage(req, res);
});

// try {
//   populatedb();
// } catch {
//   console.log("populate db error");
// }

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
