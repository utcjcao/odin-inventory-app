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
});

app.get("/pokemon/:id", async (req, res) => {});

app.get("/move/:id", async (req, res) => {});

app.get("/add", async (req, res) => {});

app.post("/add", async (req, res) => {});

// main page: GET "/" big list display of all pokemon with search bar (start with top 10 alphabetically)
// pokemon page: GET "/pokemon/:id" pokemon display + their moveset
// move page: GET "/move/:id" move + pokemons with the move
// add page GET, POST, POST "/add" submit page, where user enters name, img url, and can select a number of moves to connect to pokemon

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
