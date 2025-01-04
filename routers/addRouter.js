const { Router } = require("express");
const {
  addPokemonPost,
  addPokemonViewGet,
} = require("../controllers/addController");

const addRouter = Router();

addRouter.get("", async (req, res) => {
  await addPokemonViewGet(req, res);
});

addRouter.post("", async (req, res) => {
  await addPokemonPost(req, res);
});

module.exports = { addRouter };
