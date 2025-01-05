// need to add a post, delete, update function for pokemon
const {
  pokemonToMovePost,
  pokemonMoveDelete,
} = require("../controllers/pokemonController");

const {
  moveToPokemonPost,
  movePokemonDelete,
} = require("../controllers/moveController");

const { Router } = require("express");

const pokemonMoveRouter = Router();

// add new pokemon from move page
pokemonMoveRouter.post("/moveToPokemon/:moveId", async (req, res) => {
  await pokemonToMovePost(req, res);
});

// add new move from pokemon page
pokemonMoveRouter.post("/pokemonToMove/:pokemonId", async (req, res) => {
  await moveToPokemonPost(req, res);
});

// delete pokemon move relationship
pokemonMoveRouter.post("/delete/:pokemonId/:moveId", async (req, res) => {
  await pokemonMoveDelete(req, res);
});

module.exports = { pokemonMoveRouter };
