// need to add a post, delete, update function for pokemon
const {
  pokemonPageGet,
  pokemonDelete,
} = require("../controllers/pokemonController");

const { Router } = require("express");

const pokemonRouter = Router();

pokemonRouter.get("/:id", async (req, res) => {
  await pokemonPageGet(req, res);
});

pokemonRouter.post("/delete/:id", async (req, res) => {
  await pokemonDelete(req, res);
});

pokemonRouter.delete("/:id", async (req, res) => {
  console.log("delete");
});

module.exports = { pokemonRouter };
