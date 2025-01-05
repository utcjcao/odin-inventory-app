const {
  getMove,
  deleteMove,
  getSearchMove,
  getPokemonId,
} = require("../db/queries");

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

  // from move page, verify pokemon and add
  async moveToPokemonPost(req, res) {
    const pokemonId = await getPokemonId(req.body.pokemon);
    if (pokemonId === -1) {
      const { pokemon_data, move_data } = await getMove(req.params.moveId);
      res.render("move", {
        message: "pokemon not found",
        move_data,
        pokemon_data,
      });
    } else {
      await postPokemonMove(pokemonId, req.params.moveId);
      const { pokemon_data, move_data } = await getMove(req.params.id);
      console.log(pokemon_data);
      res.render("move", {
        message: "pokemon added",
        pokemon_data: pokemon_data,
        move_data: move_data,
      });
    }
  }

  async movePokemonDelete(req, res) {
    await deletePokemonMove(req.params.pokemonId, req.params.moveId);
    const { pokemon_data, move_data } = await getPokemon(req.params.pokemonId);
    console.log(pokemon_data);
    res.render("move", {
      message: `pokemon deleted`,
      pokemon_data: pokemon_data,
      move_data: move_data,
    });
  }
}

module.exports = new moveController();
