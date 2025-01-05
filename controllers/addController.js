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
    res.render("add", { message: "" });
  };

  checkImageWithFetch = async (url) => {
    fetch(url, { method: "HEAD" })
      .then((response) => {
        if (
          response.ok &&
          response.headers.get("Content-Type").includes("image")
        ) {
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        return false;
      });
  };

  addPokemonPost = async (req, res) => {
    let name = req.body.name;
    if (name) {
      name = name.toLowerCase();
    }

    if (await getPokemonExists(req.body.name)) {
      res.render("add", { message: "pokemon already exists" });
      return; // if the pokemon name exists already dont do anything
    }
    if (!(await this.checkImageWithFetch(req.body.img))) {
      res.render("add", { message: "invalid img link" });
      return;
    }
    await postPokemon(name, req.body.img);
    const pokemonId = await getPokemonId(name);
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
    }
    this.moves = [];
    res.render("add", { message: "pokemon added" }); // go back home page
  };
}

module.exports = new addController();
