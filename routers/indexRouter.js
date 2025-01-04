const { Router } = require("express");
const { getSearchPokemon } = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("", async (req, res) => {
  await getSearchPokemon(req, res);
});

module.exports = { indexRouter };
