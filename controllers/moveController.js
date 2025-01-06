const {
  getMove,
  deleteMove,
  getSearchMove,
  getPokemonId,
  postPokemonMove,
  deletePokemonMove,
  getPokemon,
} = require("../db/queries");

class moveController {
  constructor() {}
  async movePageGet(req, res, message = "") {
    const { move_data, pokemon_data } = await getMove(req.params.id);
    res.render("move", { move_data, pokemon_data, message });
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
  async addPokemonToMovePost(req, res) {
    const pokemonId = await getPokemonId(req.body.pokemon);
    if (pokemonId === -1) {
      const { move_data, pokemon_data } = await getMove(req.params.id);
      res.render("move", {
        move_data,
        pokemon_data,
        message: "no pokemon found",
      });
    } else {
      await postPokemonMove(pokemonId, req.params.id);

      const { move_data, pokemon_data } = await getMove(req.params.id);
      res.render("move", { move_data, pokemon_data, message: "pokemon added" });
    }
  }

  async movePokemonDelete(req, res) {
    await deletePokemonMove(req.params.pokemonId, req.params.moveId);
    const { pokemon_data, move_data } = await getMove(req.params.moveId);
    console.log(pokemon_data);
    res.render("move", {
      message: `pokemon deleted`,
      pokemon_data: pokemon_data,
      move_data: move_data,
    });
  }
}

module.exports = new moveController();
