const { fetchPokemonData } = require("../api/fetchPokemonData");
const { populatedb } = require("../db/populatedb");

async function test() {
  try {
    let data = await fetchPokemonData();
    Object.fromEntries(
      Object.entries(data)
        .sort(() => Math.random() - 0.5) // Shuffle entries
        .slice(0, 10) // Take the first `numEntries`
    );
    await populatedb(data);
  } catch (error) {
    console.log("error", error);
  }
}

test();
