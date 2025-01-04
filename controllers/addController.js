// add a postadd function, and a getadd function
const {
  postPokemon,
  postPokemonMove,
  getMoveExists,
  postMove,
  getPokemonExists,
  getPokemonId,
  getMoveId,
} = require("../db/queries");

class addController {
  constructor() {}
  addPokemonViewGet = async (req, res) => {
    res.render("add");
  };

  addPokemonPost = async (req, res) => {
    if (await getPokemonExists(req.body.name)) {
      res.render("add", { message: "pokemon already exists" });
      return; // if the pokemon name exists already dont do anything
    }
    await postPokemon(req.body.name, req.body.img);
    const pokemonId = await getPokemonId(req.body.name);
    // separate the moves by space
    let moves = req.body.moves;
    for (let move of moves.split(" ")) {
      const moveExists = await getMoveExists(move);
      if (!moveExists) {
        await postMove(move);
      }
      const moveId = await getMoveId(move);
      // add pokemon name, move to pokemon moves
      await postPokemonMove(pokemonId, moveId);
      console.log("hi");
    }
    this.moves = [];
    res.render("add", { message: "pokemon added" }); // go back home page
  };
}

module.exports = new addController();
