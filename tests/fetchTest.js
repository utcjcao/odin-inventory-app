// test.js
const { fetchPokemonData } = require("../api/fetchPokemonData");

async function test() {
  try {
    const data = await fetchPokemonData();
    console.log("Fetched Pokemon data", data);
  } catch (error) {
    console.error("Test failed:", error);
  }
}

test();
