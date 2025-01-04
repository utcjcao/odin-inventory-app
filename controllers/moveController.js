const { getMove } = require("../db/queries");

class moveController {
  constructor() {}
  async movePageGet(req, res) {
    const { move_data, pokemon_data } = await getMove(req.params.id);
    console.log(move_data);
    res.render("move", { move_data, pokemon_data });
  }
}

module.exports = new moveController();
