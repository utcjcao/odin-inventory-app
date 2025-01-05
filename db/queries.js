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
  const { rows: pokemonDataRows } = await pool.query(
    pokemonDataQuery,
    pokemonDataQueryValues
  );

  const moveDataIdQuery = "SELECT * FROM pokemon_moves WHERE pokemon_id = $1;";
  const moveDataIdQueryValues = [id];
  const { rows: moveDataIdRows } = await pool.query(
    moveDataIdQuery,
    moveDataIdQueryValues
  );

  const moveDataQuery = "SELECT * FROM move_data WHERE id = $1;";

  let move_data = [];
  for (let moveDataRow of moveDataIdRows) {
    const moveData = await pool.query(moveDataQuery, [moveDataRow.move_id]);

    move_data.push(moveData.rows[0]);
  }
  return {
    pokemon_data: pokemonDataRows,
    move_data: move_data,
  };
}

async function getMove(id) {
  const moveDataQuery = "SELECT * FROM move_data WHERE id = $1;";
  const moveDataQueryValues = [id];
  const { rows: move_data_rows } = await pool.query(
    moveDataQuery,
    moveDataQueryValues
  );

  const pokemonDataIdQuery = "SELECT * FROM pokemon_moves WHERE move_id = $1;";
  const pokemonDataIdQueryValues = [id];
  const { rows: pokemon_data_id_row } = await pool.query(
    pokemonDataIdQuery,
    pokemonDataIdQueryValues
  );

  const pokemonDataQuery = "SELECT * FROM pokemon_data WHERE id = $1;";

  let pokemon_data = [];
  for (let pokemon_data_row of pokemon_data_id_row) {
    const pokemonData = await pool.query(pokemonDataQuery, [
      pokemon_data_row.pokemon_id,
    ]);

    pokemon_data.push(pokemonData.rows[0]);
  }
  console.log(move_data_rows[0]);

  return {
    pokemon_data: pokemon_data,
    move_data: move_data_rows[0],
  };
}

async function getSearchPokemon(name) {
  const query = "SELECT * FROM pokemon_data WHERE name like $1;";
  const values = [name + "%"];
  const { rows } = await pool.query(query, values);
  return rows;
}

async function getSearchMove(name) {
  const query = "SELECT * FROM move_data WHERE name like $1;";
  const values = [name + "%"];
  const { rows } = await pool.query(query, values);
  return rows;
}

async function postPokemon(name, img) {
  await pool.query("INSERT INTO pokemon_data (name, img) VALUES ($1, $2);", [
    name,
    img,
  ]);
}

async function postMove(name) {
  await pool.query("INSERT INTO move_data (name) VALUES ($1);", [name]);
}

async function getMoveExists(name) {
  const { rows } = await pool.query(
    "SELECT 1 FROM move_data WHERE name = $1 LIMIT 1;",
    [name]
  );
  return rows.length > 0;
}

async function getPokemonExists(name) {
  const { rows } = await pool.query(
    "SELECT 1 FROM pokemon_data WHERE name = $1 LIMIT 1;",
    [name]
  );
  return rows.length > 0;
}

async function getPokemonId(name) {
  const { rows } = await pool.query(
    "SELECT * FROM pokemon_data WHERE name = $1;",
    [name]
  );
  return rows[0].id;
}

async function getMoveId(name) {
  const { rows } = await pool.query(
    "SELECT * FROM move_data WHERE name = $1;",
    [name]
  );
  if (rows.length > 0) {
    return rows[0].id;
  } else {
    return -1;
  }
}

// assuming that the pokemon and move already exist
async function postPokemonMove(pokemonId, moveId) {
  await pool.query(
    "INSERT INTO pokemon_moves (pokemon_id, move_id) VALUES ($1, $2) ON CONFLICT (pokemon_id, move_id) DO NOTHING;",
    [pokemonId, moveId]
  );
}

// precond: assuming that newPokemonName and newPokemonImg are not empty (so use a required tag)
async function updatePokemon(pokemonId, newPokemonName, newPokemonImg) {
  await pool.query("UPDATE pokemon_data SET name = $1 WHERE id = $2;", [
    newPokemonName,
    pokemonId,
  ]);
  await pool.query("UPDATE pokemon_data SET img = $1 WHERE id = $2;", [
    newPokemonImg,
    pokemonId,
  ]);
}

// precond: assuming that newMoveName is not empty (so use a required tag)
async function updateMove(moveId, newMoveName) {
  await pool.query("UPDATE name SET $1 from move_data WHERE id = $2;", [
    newMoveName,
    moveId,
  ]);
}

async function deletePokemonMove(pokemonId, moveId) {
  await pool.query(
    "DELETE FROM pokemon_moves WHERE pokemon_id = $1 and move_id = $2;",
    [pokemonId, moveId]
  );
}

async function deletePokemon(id) {
  await pool.query("DELETE FROM pokemon_data WHERE id = $1;", [id]);
}

async function deleteMove(id) {
  await pool.query("DELETE FROM move_data WHERE id = $1;", [id]);
}

module.exports = {
  getAllPokemon,
  getPokemon,
  getMove,
  getSearchPokemon,
  getSearchMove,
  getMoveExists,
  getPokemonExists,
  getPokemonId,
  getMoveId,
  postPokemon,
  postMove,
  postPokemonMove,
  updatePokemon,
  updateMove,
  deletePokemon,
  deleteMove,
  deletePokemonMove,
};
