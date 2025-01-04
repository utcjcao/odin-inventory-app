const {
  getPokemon,
  updatePokemon,
  deletePokemon,
  postPokemonMove,
} = require("../db/queries");

class pokemonController {
  constructor() {}
  async pokemonPageGet(req, res) {
    const { pokemon_data, move_data } = await getPokemon(req.params.id);
    console.log(pokemon_data);
    res.render("pokemon", { pokemon_data: pokemon_data, move_data });
  }

  //   unused b/c this logic is encapsualted in addController
  //   async pokemonPost(req, res) {
  //     await postPokemon(req.body.name, req.body.img)
  //   }

  async pokemonUpdate(req, res) {
    const id = req.body.id;
    const name = req.body.name;
    const img = req.body.img;
    await updatePokemon(id, name, img);
    res.render(`/pokemon/:${id}`); // re render the pokemon page
  }
  async pokemonDelete(req, res) {
    console.log(req.params.id);
    res.render("index", { results: [] });
    await deletePokemon(req.params.id);
  }
  async pokemonMovePost(req, res) {
    await postPokemonMove(req.body.pokemon, req.body.move);
    const pokemonId = res.render(`/pokemon/:${req.body.id}`); // re render the pokemon page
  }
}

module.exports = new pokemonController();
