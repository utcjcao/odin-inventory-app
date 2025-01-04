// add get for search,
const { getSearchPokemon } = require("../db/queries");

class indexController {
  constructor() {}

  getSearchPokemon = async (req, res) => {
    let name = req.query.query;
    let results = [];
    if (name) {
      name = name.toLowerCase();
      results = await getSearchPokemon(name);
    }
    res.render("index", { results: results });
  };
}

module.exports = new indexController();
