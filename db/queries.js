const pool = require("./pool");

// these are database functions

// database: pokemon_inventory
// table: pokemon_data
// id, name:text, img: text, moves: text
// table: pokemon_team
// id, name:text, img: text, moves: text (same data but capped at 6)

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
  const { move_data } = await pool.query(pokemonDataQuery, moveDataQueryValues);

  console.log(rows);
  return { pokemon_data, move_data };
}

async function getSearchPokemon(name) {
  const query = "SELECT * FROM pokemon_data WHERE name like $1;";
  const values = [name + "%"];
  const { rows } = await pool.query(query, values);
  console.log(rows);
  return rows;
}

async function getAllPokemonTeam() {
  const { rows } = await pool.query("SELECT * FROM pokemon_team;");
  console.log(rows);
  return rows;
}

async function getPokemonTeamSize() {
  let teamSizeQuery = await pool.query("SELECT COUNT(*) FROM pokemon_team");
  return teamSizeQuery.rows[0].count;
}

async function postPokemonToTeam(id) {
  await pool.query(
    "INSERT INTO pokemon_team (name, img, id) VALUES ($1, $2, $3);",
    [name, message, id]
  );
}

module.exports = {
  getAllPokemon,
  getPokemon,
  getSearchPokemon,
  getAllPokemonTeam,
  getPokemonTeamSize,
  postPokemonToTeam,
};
