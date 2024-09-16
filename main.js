const { readFile, writeFile } = require('fs').promises;
const path = require("path");
const POKEMON_FILE_PATH = path.join(__dirname, "pokemon.json")

async function main() {
    // Suppose we want to keep track of our pokemon in an app...
    
    // create a pokemon object
    const pikachu = {
        name: "Pikachu", 
        type: "Electric"
    }

    const charizard = {
        name: "Charizard", 
        type: "Fire"
    }

    // create a variable to hold our "pokemon array"
    const pokemonArray = []
    pokemonArray.push(pikachu);
    pokemonArray.push(charizard)

    // our database now has one pokemon in it
    console.log("Pokemon Array:", pokemonArray);

    // WHAT IF I want to write a pokemon app that keeps track of the pokemon I have,
    // and lets me catch, train, and fight them, and sort them into decks?
    // What is missing from this setup? (We are starting over with new pokemon every time we run the app)

    // What we need is... a database!
    // A database has PERSISTENCE and data we put in it will still be there after our app closes
    // Amazon has been running for decades adding to its customer data

    // Since we don't start on databases until tomorrow, today we are going to "fake it"
    //   with a local file! We will read it in and save our changes to it. You could think of it as an incredibly basic database
    const buffer = await readFile(POKEMON_FILE_PATH);
    const pokemonDB = JSON.parse(buffer);
    console.log("Persistent Pokemon:", pokemonDB)

    // add pokemon to our db
    //   { "name": "Ivysaur", "type": "Grass" },
    //   { "name": "Mew", "type": "Psychic" }
    pokemonDB.push({
        name: "Mew",
        type: "Psychic"
    })
    console.log("Persistent Pokemon:", pokemonDB)

    const saveText = JSON.stringify(pokemonDB);
    await writeFile(POKEMON_FILE_PATH, saveText)
}

main()