const {
  getPokemon,
  updatePokemon,
  deletePokemon,
  postPokemonMove,
  getMoveId,
} = require("../db/queries");

class pokemonController {
  constructor() {}

  async pokemonPageGet(req, res, message = "") {
    const { pokemon_data, move_data } = await getPokemon(req.params.id);
    console.log(pokemon_data);
    res.render("pokemon", {
      message: message,
      pokemon_data: pokemon_data,
      move_data: move_data,
    });
  }

  async getSearchPokemon(req, res) {
    let name = req.query.query;
    let results = [];
    if (name) {
      name = name.toLowerCase();
      results = await getSearchPokemon(name);
    }
    console.log(results);
    res.render("searchPokemon", { results: results });
  }

  async pokemonDelete(req, res) {
    console.log(req.params.id);
    res.render("index", { results: [] });
    await deletePokemon(req.params.id);
  }

  async pokemonMovePost(req, res) {
    const moveId = await getMoveId(req.body.move);
    if (moveId === -1) {
      const { pokemon_data, move_data } = await getPokemon(req.params.id);
      console.log(pokemon_data);
      res.render("pokemon", {
        message: "no such move",
        pokemon_data: pokemon_data,
        move_data: move_data,
      });
    } else {
      await postPokemonMove(req.params.id, moveId);
      const { pokemon_data, move_data } = await getPokemon(req.params.id);
      console.log(pokemon_data);
      res.render("pokemon", {
        message: "move added",
        pokemon_data: pokemon_data,
        move_data: move_data,
      });
    }
  }
}

module.exports = new pokemonController();
