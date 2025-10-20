import { useState } from 'react'
import './App.css'
import Sidebar from './components/SideBars';
import ShowEntry from './components/DexEntry';

function App() {
  const [count, setCount] = useState(0)

  // [The Current Pokemon Data Entry] //
  const [currentPokemon, setCurrentPokemon] = useState(null);
  // [Tracks Banned Lists] //
  const [banList, setBanList] = useState([]);
  // [Tracks History List] //
  const [history, setHistory] = useState([]);

  // --[Fetch Pokemon]-- //
  const fetchPokemon = async () => {

    // [ 'try {} catch () {} finnaly {' Handles API Errors without Crashing] //
    try {
      // [API Pokemon --> Pokedex Entry from Gen 1-9] //
      let RandomID = Math.floor(Math.random() * 1025) + 1;
      const APICall = `https://pokeapi.co/api/v2/pokemon/${RandomID}`;

      // [Fetch API Call] //
      const Response = await fetch(APICall);
      if (!Response.ok) {
        throw new Error(`Pokémon Not Found!`);
      }
      const Data = await Response.json();


      // [Pokemon Egg Groups]
      const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${Data.id}`);
      const speciesData = await speciesResponse.json();


      // [Pokemon Values] //
      const PokeValue = {
        id: Data.id,
        name: Data.name.charAt(0).toUpperCase() + Data.name.slice(1),
        image: Data.sprites.front_default,
        types: Data.types.map(t => t.type.name),
        abilities: Data.abilities.map(a => a.ability.name),
        eggGroups: speciesData.egg_groups.map(e => e.name),
      }


      // [Filtering Banned Pokemons] //
      const isBanned = 
      PokeValue.types.some(type => banList.includes(type)) ||
      PokeValue.abilities.some(ability => banList.includes(ability)) ||
      PokeValue.eggGroups.some(group => banList.includes(group));
      if (isBanned) {
        console.log(`Skipped ${PokeValue.name} — banned type`);
        fetchPokemon();
        return;
      }


      // [Update the Current Displayed Pokemon] //
      setCurrentPokemon(PokeValue);

      // [Update the Current History] //
      setHistory(prev => {
        const Viewed = prev.find(p => p.id === PokeValue.id);
        return Viewed ? prev : [...prev, PokeValue];
      });

    } catch (error) {
      console.error('Error Fetching Pokémon:', error);
    }
  };


  return (
    <>
      <div className='Page-Container'>
        <div className='Layout-Container'>
          {/* History Sidebar */}
          <Sidebar
            BannedList={banList}
            RemoveBan={(type) =>
              setBanList(banList.filter((b) => b !== type))
            }
            History={history}
          />


          {/* Middle-Title-Random */}
          <div className='Main-Content'>
            <h1>Veni Vici Pokémon Pokédex</h1>
            <button onClick={fetchPokemon}>Random Pokémon</button>


            {/* Banned Sidebar */}
            {currentPokemon && (
              <ShowEntry
                pokemon={currentPokemon}
                banList={banList}
                setBanList={setBanList}
              />
            )}


          </div>
        </div>
      </div>
    </>
  )
}

export default App