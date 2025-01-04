// need to add a post, delete function for pokemon moves

const { Router } = require("express");
const { movePageGet } = require("../controllers/moveController");

const pokemonMovesRouter = Router();

pokemonMovesRouter.delete("/", async (req, res) => {
  await movePageGet(req, res);
});

pokemonMovesRouter.post("/", async (req, res) => {
  await movePageGet(req, res);
});
module.exports = { pokemonMovesRouter };
