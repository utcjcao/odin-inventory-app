const { fetchPokemonData } = require("../api/fetchPokemonData");
const pool = require("./pool");

const initTableSql = `
CREATE TABLE IF NOT EXISTS pokemon_data (
  id SERIAL PRIMARY KEY,
  name TEXT,
  img TEXT
);
CREATE TABLE IF NOT EXISTS move_data (
  id SERIAL PRIMARY KEY,
  name TEXT
);

CREATE TABLE IF NOT EXISTS pokemon_moves (
  pokemon_id INT REFERENCES pokemon_data(id) ON DELETE CASCADE,
  move_id INT REFERENCES move_data(id) ON DELETE CASCADE,
  PRIMARY KEY (pokemon_id, move_id)
);
`;

const insertPokemonSql =
  "INSERT INTO pokemon_data (name, img) VALUES ($1, $2);";
const insertMoveSql = "INSERT INTO move_data (name) VALUES ($1)";
const findMoveIdSql = "SELECT id FROM move_data WHERE name = $1;";
const findPokemonIdSql = "SELECT id FROM pokemon_data WHERE name = $1;";
const insertPokemonMoveSql =
  "INSERT INTO pokemon_moves (pokemon_id, move_id) VALUES ($1, $2);";

async function createTables() {
  await pool.query(initTableSql);
}

async function populatePokemonEntries(pokemonData) {
  for (let pokemonId in pokemonData) {
    const values = [pokemonData[pokemonId].name, pokemonData[pokemonId].img];
    await pool.query(insertPokemonSql, values);
    for (let moveData of pokemonData[pokemonId].moves) {
      let moveIdResult = await pool.query(findMoveIdSql, [moveData.move.name]); // check if move is already present
      let moveId = moveIdResult.rows[0]?.id;

      if (!moveId) {
        await pool.query(insertMoveSql, [moveData.move.name]);

        moveIdResult = await pool.query(findMoveIdSql, [moveData.move.name]);
        moveId = moveIdResult.rows[0]?.id;
      }
      // find the pokemon sql id since its not the same at the pokemonId (bc SERIAL)
      const sqlPokemonResult = await pool.query(findPokemonIdSql, [
        pokemonData[pokemonId].name,
      ]);
      let sqlPokemonId = sqlPokemonResult.rows[0]?.id;
      await pool.query(insertPokemonMoveSql, [sqlPokemonId, moveId]);
    }
  }
}

async function populatedb(data) {
  console.log("seeding...");
  try {
    await pool.query("BEGIN");
    await createTables();
    console.log("tables done");
    await populatePokemonEntries(data);
    await pool.query("COMMIT");

    console.log("populate success");
  } catch (error) {
    await pool.query("ROLLBACK");

    console.log("error: ", error);
  }
}
async function main() {
  try {
    const data = await fetchPokemonData();
    console.log("data fetched");
    await populatedb(data);
  } catch (error) {
    console.log("error", error);
  }
}

module.exports = { main };
