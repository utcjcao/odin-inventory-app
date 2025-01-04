// need to add a post, delete, update function for pokemon
const { pokemonPageGet } = require("../controllers/pokemonController");

const { Router } = require("express");

const pokemonRouter = Router();

pokemonRouter.get("/:id", async (req, res) => {
  await pokemonPageGet(req, res);
});

module.exports = { pokemonRouter };
