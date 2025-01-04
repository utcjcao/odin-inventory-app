const { getPokemon } = require("../db/queries");

class moveController {
  constructor() {}
  async pokemonPageGet(req, res) {
    const { pokemon_data, move_data } = getPokemon(req.body.id);
    res.render("/pokemon", { pokemon_data, move_data });
  }
}
