// need to add a post, delete, update function for pokemon
const {
  pokemonPageGet,
  pokemonDelete,
  getSearchPokemon,
  pokemonMovePost,
} = require("../controllers/pokemonController");

const { Router } = require("express");

const pokemonRouter = Router();

pokemonRouter.get("/:id", async (req, res) => {
  console.log("get request");
  await pokemonPageGet(req, res);
});

pokemonRouter.post("/:id", async (req, res) => {
  await pokemonMovePost(req, res);
});

pokemonRouter.post("/delete/:id", async (req, res) => {
  console.log("post request");

  await pokemonDelete(req, res);
});

pokemonRouter.get("", async (req, res) => {
  await getSearchPokemon(req, res);
});

module.exports = { pokemonRouter };
