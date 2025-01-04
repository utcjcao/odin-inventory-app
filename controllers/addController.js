// add a postadd function, and a getadd function
const {
  postPokemon,
  postPokemonMove,
  getMoveExists,
  postMove,
} = require("../db/queries");

class addController {
  constructor() {}
  addPokemonViewGet = async (req, res) => {
    res.render("/add", {
      moves: this.moves,
    });
  };

  addPokemonPost = async (req, res) => {
    postPokemon(req.body.name, req.body.img, req.body.id);
    for (let move of req.body.moves) {
      // todo: separate req.body.moves into separate names
      //   check if the move does not exist, and if so put a new move entry into the table
      const moveExists = getMoveExists(move);
      if (!moveExists) {
        postMove(move);
      }
      // add pokemon name, move to pokemon moves
      postPokemonMove(req.body.name, move);
    }
    this.moves = [];
    res.render("/add", { moves: this.moves });
  };
}

module.exports = new addController();
