// add a postadd function, and a getadd function
const {
  postPokemon,
  postPokemonMove,
  getMoveExists,
  postMove,
  getPokemonExists,
} = require("../db/queries");

class addController {
  constructor() {}
  addPokemonViewGet = async (req, res) => {
    res.render("add");
  };

  addPokemonPost = async (req, res) => {
    if (await getPokemonExists(req.body.name)) {
      return; // if the pokemon name exists already dont do anything
    }
    await postPokemon(req.body.name, req.body.img);
    // separate the moves by space
    let moves = req.body.moves.split(" ");
    for (let move of moves) {
      const moveExists = await getMoveExists(move);
      if (!moveExists) {
        await postMove(move);
      }
      // add pokemon name, move to pokemon moves
      await postPokemonMove(req.body.name, move);
    }
    this.moves = [];
    res.render("index", {}); // go back home page
  };
}

module.exports = new addController();
