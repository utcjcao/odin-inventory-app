// add get for search,
const { getSearchPokemon } = require("../db/queries");

class indexController {
  constructor() {}

  getSearchPokemon = async (req, res) => {
    const name = req.query.name;
    let results = [];
    if (name) {
      results = await getSearchPokemon(name, message, this.id);
    }
    res.render("/", { results: results });
  };
}

module.exports = new indexController();
