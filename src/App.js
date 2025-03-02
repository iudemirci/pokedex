import {useEffect, useState} from "react";
import {PokemonList} from "./components/PokemonList";
import {Button} from "./components/Button";
import {Loader} from "./components/Loader";
import {SelectSort} from "./components/SelectSort";
import {PokemonDetails} from "./components/PokemonDetails";

export default function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const pokemonPerPage = 16;
  const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`;
  const [pokemonOffset, setPokemonOffset] = useState(16);
  const [selectValue, setSelectValue] = useState("ID-Asc");
  const sortedPokemonData =
    selectValue === "ID-Asc"
      ? pokemonData
      : pokemonData.slice().sort((a, b) => b.id - a.id);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const response = await fetch(apiUrl).then((res) => res.json());
        const _pokemonData = await Promise.all(
          response.results.map(async (pokemon) => {
            return await fetch(pokemon.url).then((res) =>
              res.json()
            );
          })
        );

        const genData = await Promise.all(
          _pokemonData.map(async (data) => {
            const speciesData = await fetch(data.species.url).then((res) =>
              res.json()
            );
            const generationName = speciesData.generation.name;
            return {
              ...data,
              generation: generationName,
            };
          })
        );

        setPokemonData(genData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [apiUrl]);

  //buttons
  function handleNext() {
    if (pokemonOffset >= 1304) return;
    setPokemonOffset((o) => (o += pokemonPerPage));
  }
  function handlePrevious() {
    if (pokemonOffset === 16) return;
    setPokemonOffset((o) => (o -= pokemonPerPage));
  }
  function handleEnd() {
    if (pokemonOffset === 1312) return;
    setPokemonOffset((o) => 1312);
  }
  function handleStart() {
    if (pokemonOffset === 0) return;
    setPokemonOffset((o) => 16);
  }

  //Key events
  useEffect(() => {
    function callback(e) {
      if (e.code === "ArrowRight") {
        handleNext();
      }
      if (e.code === "ArrowLeft") {
        handlePrevious();
      }
    }
    document.addEventListener("keydown", callback);
    return function () {
      document.removeEventListener("keydown", callback);
    };
  }, [handlePrevious, handleNext]);

  function handleCardClick(pokemon) {
    console.log(pokemon);
    setIsClicked(true);
    setSelectedPokemon(pokemon);
  }

  return (
    <main className="container">
      {isLoading && <Loader />}
      {!isLoading && !isClicked && (
        <PokemonList
          pokemons={sortedPokemonData.slice(
            pokemonOffset - pokemonPerPage,
            pokemonOffset
          )}
          onDetails={handleCardClick}
        />
      )}
      {isClicked && (
        <PokemonDetails pokemon={selectedPokemon} onClick={setIsClicked} />
      )}
      {!isClicked && (
        <div className="nav-bar">
          <div></div>
          <div className="flex gap">
            <Button onButton={handleStart}>&lArr;</Button>
            <Button onButton={handlePrevious}>&larr;</Button>
            <Button onButton={handleNext}>&rarr;</Button>
            <Button onButton={handleEnd}>&rArr;</Button>
          </div>
          <SelectSort onSelect={setSelectValue} />
        </div>
      )}
    </main>
  );
}
