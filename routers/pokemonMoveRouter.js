// need to add a post, delete, update function for pokemon
const {
  addMoveToPokemonPost,
  pokemonMoveDelete,
} = require("../controllers/pokemonController");

const {
  addPokemonToMovePost,
  movePokemonDelete,
} = require("../controllers/moveController");

const { Router } = require("express");

const pokemonMoveRouter = Router();

// @ move page, add pokemon (id is move id)
pokemonMoveRouter.post("/addPokemonToMove/:id", async (req, res) => {
  console.log("adding move to pokemon");
  await addPokemonToMovePost(req, res);
});

// @ pokemon page, add move (id is pokemon id)
pokemonMoveRouter.post("/addMoveToPokemon/:id", async (req, res) => {
  console.log("adding pokemon to move");
  await addMoveToPokemonPost(req, res);
});

// delete pokemon move relationship
pokemonMoveRouter.post(
  "/deleteMoveFromPokemon/:pokemonId/:moveId",
  async (req, res) => {
    await pokemonMoveDelete(req, res);
  }
);

pokemonMoveRouter.post(
  "/deletePokemonFromMove/:pokemonId/:moveId",
  async (req, res) => {
    await movePokemonDelete(req, res);
  }
);

module.exports = { pokemonMoveRouter };
