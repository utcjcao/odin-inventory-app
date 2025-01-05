const { getMove, deleteMove, getSearchMove } = require("../db/queries");

class moveController {
  constructor() {}
  async movePageGet(req, res) {
    const { move_data, pokemon_data } = await getMove(req.params.id);
    console.log(move_data);
    res.render("move", { move_data, pokemon_data });
  }
  async moveDelete(req, res) {
    console.log(req.params.id);
    res.render("index", { results: [] });
    await deleteMove(req.params.id);
  }

  getSearchMove = async (req, res) => {
    let name = req.query.query;
    let results = [];
    if (name) {
      name = name.toLowerCase();
      results = await getSearchMove(name);
    }
    res.render("searchMove", { results: results });
  };
}

module.exports = new moveController();
