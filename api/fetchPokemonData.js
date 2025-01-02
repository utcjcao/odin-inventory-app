const axios = require("axios");

const batchFetch = async (urls, arguments = {}, batchSize = 10) => {
  let results = [];

  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map((url) => axios.get(url, arguments))
    );
    results = results.concat(batchResults.map((res) => res.data));
  }

  return results;
};

const fetchPokemonData = async () => {
  let textEndpoints = [];
  let imgUrls = [];
  for (let id = 1; id <= 151; id++) {
    textEndpoints.push(`https://pokeapi.co/api/v2/pokemon/${id}`);
    imgUrls.push(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`
    );
  }
  try {
    const textData = await batchFetch(textEndpoints, { timeout: 5000 });

    const allData = {};

    for (let id = 1; id <= 151; id++) {
      const pokemonEntry = {
        name: textData[id - 1].name,
        img: imgUrls[id - 1],
        moves: textData[id - 1].moves,
      };
      allData[id] = pokemonEntry;
    }

    return allData;
  } catch (error) {
    console.log("error:", error);
  }
};

module.exports = {
  fetchPokemonData,
};
