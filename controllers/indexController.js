// add get for search,
const { getSearchPokemon } = require("../db/queries");

class indexController {
  constructor() {}

  getSearchPokemon = async (req, res) => {
    const name = req.query.queryInput.toLowerCase();
    let results = [];
    if (name) {
      results = await getSearchPokemon(name);
    }
    res.render("index", { results: results });
  };
}

module.exports = new indexController();
