const path = require("path");
const express = require("express");
const methodOverride = require("method-override");

const { pokemonRouter } = require("./routers/pokemonRouter");
const { moveRouter } = require("./routers/moveRouter");
const { addRouter } = require("./routers/addRouter");
const { indexRouter } = require("./routers/indexRouter");
const { pokemonMoveRouter } = require("./routers/pokemonMoveRouter");
const { main } = require("./db/populatedb");

const app = new express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.use("/add", addRouter);
app.use("/move", moveRouter);
app.use("/pokemonmove", pokemonMoveRouter);
app.use("/pokemon", pokemonRouter);
app.use("/", indexRouter);

// main page: GET "/" big list display of all pokemon with search bar (start with top 10 alphabetically)

// pokemon page: GET "/pokemon/:id" pokemon display + their moveset
// should also have the option to a) delete pokemon data, b) edit pokemon data, c) add or delete moves

// move page: GET "/move/:id" move + pokemons with the move
// should also have optoin to a) delete move data, b) edit move data, c) add or delete related pokemon

// add page GET, POST "/add" submit page, where user enters name, img url, and can select moves to connect to pokemon

main();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
