const { getMove } = require("../db/queries");

class moveController {
  constructor() {}
  async movePageGet(req, res) {
    const { move_data, pokemon_data } = getMove(req.body.id);
    res.render("/move", { move_data, pokemon_data });
  }
}
