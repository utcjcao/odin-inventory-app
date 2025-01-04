const {
  getAllPokemon,
  getPokemon,
  getMove,
  getSearchPokemon,
  postPokemon,
  postMove,
  postPokemonMove,
  updatePokemon,
  deletePokemon,
} = require("../db/queries"); // import your functions
const pool = require("../db/pool"); // PostgreSQL connection pool

describe("Pokemon Database Functions", () => {
  // Run before each test to reset the database state if needed (if using real DB)
  beforeAll(async () => {
    // Optionally reset the database or insert mock data
    await pool.query(
      "TRUNCATE TABLE pokemon_data, move_data, pokemon_moves RESTART IDENTITY CASCADE"
    );
  });

  test("getAllPokemon should return all pokemon", async () => {
    // Insert test data
    await pool.query("INSERT INTO pokemon_data (name, img) VALUES ($1, $2);", [
      "Pikachu",
      "img_url",
    ]);

    const pokemons = await getAllPokemon();
    expect(pokemons.length).toBeGreaterThan(0); // Check that we get at least one Pokémon
    expect(pokemons[0].name).toBe("Pikachu");
  });

  test("getPokemon should return specific Pokémon by ID", async () => {
    const res = await pool.query(
      "INSERT INTO pokemon_data (name, img) VALUES ($1, $2) RETURNING id;",
      ["Charmander", "img_url"]
    );
    const pokemonId = res.rows[0].id;

    const pokemon = await getPokemon(pokemonId);
    console.log(pokemon.pokemon_data);
    expect(pokemon.pokemon_data[0].name).toBe("Charmander");
  });

  test("getSearchPokemon should return pokemon matching search", async () => {
    await pool.query("INSERT INTO pokemon_data (name, img) VALUES ($1, $2);", [
      "Bulbasaur",
      "img_url",
    ]);

    const result = await getSearchPokemon("Bul");
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].name).toBe("Bulbasaur");
  });

  test("postPokemon should insert a new Pokémon", async () => {
    await postPokemon("Squirtle", "img_url");

    const result = await pool.query(
      "SELECT * FROM pokemon_data WHERE name = $1;",
      ["Squirtle"]
    );
    expect(result.rows.length).toBe(1);
    expect(result.rows[0].name).toBe("Squirtle");
  });

  test("postMove should insert a new move", async () => {
    await postMove("Water Gun");

    const result = await pool.query(
      "SELECT * FROM move_data WHERE name = $1;",
      ["Water Gun"]
    );
    expect(result.rows.length).toBe(1);
    expect(result.rows[0].name).toBe("Water Gun");
  });

  test("postPokemonMove should add a move to a Pokémon", async () => {
    const pokemonRes = await pool.query(
      "INSERT INTO pokemon_data (name, img) VALUES ($1, $2) RETURNING id;",
      ["Bulbasaur", "img_url"]
    );
    const moveRes = await pool.query(
      "INSERT INTO move_data (name) VALUES ($1) RETURNING id;",
      ["Tackle"]
    );

    await postPokemonMove(pokemonRes.rows[0].id, moveRes.rows[0].id);

    const result = await pool.query(
      "SELECT * FROM pokemon_moves WHERE pokemon_id = $1 AND move_id = $2;",
      [pokemonRes.rows[0].id, moveRes.rows[0].id]
    );
    expect(result.rows.length).toBe(1); // The relationship should now exist
  });

  test("updatePokemon should update Pokémon info", async () => {
    const res = await pool.query(
      "INSERT INTO pokemon_data (name, img) VALUES ($1, $2) RETURNING id;",
      ["Pidgey", "img_url"]
    );
    const pokemonId = res.rows[0].id;

    await updatePokemon(pokemonId, "Pidgeot", "new_img_url");

    const updatedPokemon = await pool.query(
      "SELECT * FROM pokemon_data WHERE id = $1;",
      [pokemonId]
    );
    expect(updatedPokemon.rows[0].name).toBe("Pidgeot");
  });

  test("deletePokemon should delete a Pokémon", async () => {
    const res = await pool.query(
      "INSERT INTO pokemon_data (name, img) VALUES ($1, $2) RETURNING id;",
      ["Rattata", "img_url"]
    );
    const pokemonId = res.rows[0].id;

    await deletePokemon(pokemonId);

    const deletedPokemon = await pool.query(
      "SELECT * FROM pokemon_data WHERE id = $1;",
      [pokemonId]
    );
    expect(deletedPokemon.rows.length).toBe(0);
  });

  // Add tests for other functions as needed...
});
