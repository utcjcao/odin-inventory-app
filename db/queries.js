const pool = require("./pool");

// these are database functions

// database: pokemon_inventory
// table: pokemon_data
// id, name:text, img: text, moves: text
// table: move_data
// id, name:text,
// table: pokemon_moves
// id, pokemon_id, move_id

// what do i want to do:
// you can search up pokemon, they click select and add to your team

async function getAllPokemon() {
  const { rows } = await pool.query("SELECT * FROM pokemon_data;");
  console.log(rows);
  return rows;
}

async function getPokemon(id) {
  const pokemonDataQuery = "SELECT * FROM pokemon_data WHERE id = $1;";
  const pokemonDataQueryValues = [id];
  const { pokemon_data } = await pool.query(
    pokemonDataQuery,
    pokemonDataQueryValues
  );

  const moveDataQuery = "SELECT * FROM pokemon_moves WHERE pokemon_id = $1;";
  const moveDataQueryValues = [id];
  const { move_data } = await pool.query(moveDataQuery, moveDataQueryValues);

  console.log(rows);
  return { pokemon_data, move_data };
}

async function getMove(id) {
  const moveDataQuery = "SELECT * FROM move_data WHERE id = $1;";
  const moveDataQueryValues = [id];
  const { move_data } = await pool.query(moveDataQuery, moveDataQueryValues);

  const pokemonDataQuery = "SELECT * FROM pokemon_moves WHERE move_id = $1;";
  const pokemonDataQueryValues = [id];
  const pokemon_data = await pool.query(
    pokemonDataQuery,
    pokemonDataQueryValues
  );
  return { move_data, pokemon_data };
}

async function getSearchPokemon(name) {
  const query = "SELECT * FROM pokemon_data WHERE name like $1;";
  const values = [name + "%"];
  const { rows } = await pool.query(query, values);
  console.log(rows);
  return rows;
}

async function postPokemon(name, img, id) {
  await pool.query(
    "INSERT INTO pokemon_data (name, img, id) VALUES ($1, $2, $3);",
    [name, img, id]
  );
}

async function postMove(name) {
  await pool.query("INSERT INTO move_data (name) VALUES ($1);", [name]);
}

async function getMoveExists(name) {
  const { rows } = await pool.query(
    "SELECT * FROM move_data (name) VALUES ($1);",
    [name]
  );
  if (rows) {
    return true;
  } else {
    return false;
  }
}

async function postPokemonMove(pokemonName, moveName) {
  const pokemonId = await pool.query(
    "SELECT id from pokemon_data WHERE name = $1;",
    [pokemonName]
  );
  const moveId = await pool.query("SELECT id from move_data WHERE name = $1;", [
    moveName,
  ]);
  await pool.query(
    "INSERT INTO pokemon_moves (pokemon_id, move_id) VALUES ($1, $2);",
    [pokemonId, moveId]
  );
}

module.exports = {
  getAllPokemon,
  getPokemon,
  getMove,
  getSearchPokemon,
  postPokemon,
  postMove,
  postPokemonMove,
  getMoveExists,
};
