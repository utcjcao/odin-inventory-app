const { getMove, deleteMove } = require("../db/queries");

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
}

module.exports = new moveController();
