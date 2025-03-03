import { useEffect, useState } from "react";
import { PokemonList } from "./components/PokemonList";
import { Button } from "./components/Button";
import { Loader } from "./components/Loader";
import { SelectSort } from "./components/SelectSort";
import { PokemonDetails } from "./components/PokemonDetails";
import { PokemonTypeBar } from "./components/PokemonTypeBar";
import { PokemonGenBar } from "./components/PokemonGenBar";

export default function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [selectedGen, setSelectedGen] = useState("");
  const pokemonPerPage = 16;
  const [pokemonOffset, setPokemonOffset] = useState(16);
  const [selectValue, setSelectValue] = useState("ID-Asc");

  const pokemonSort = function (data) {
    if (selectedType.length === 0 && pokemonGenSorted.length === 0)
      return pokemonData;
    if (selectedType.length === 0) return pokemonGenSorted;
    if (selectedType.length === 1)
      return data.filter((pokemon) =>
        pokemon.types.find((type) => type.type.name === selectedType[0]),
      );
    return data
      .filter((pokemon) =>
        pokemon.types.find((type) => type.type.name === selectedType[0]),
      )
      .filter((pokemon) =>
        pokemon.types.find((type) => type.type.name === selectedType[1]),
      );
  };
  const pokemonGenSorted = pokemonData.filter(
    (pokemon) => pokemon.generation === selectedGen,
  );
  const pokemonsFinal =
    pokemonGenSorted.length > 0
      ? pokemonSort(pokemonGenSorted)
      : pokemonSort(pokemonData);

  const sortedPokemonData =
    selectValue === "ID-Asc"
      ? pokemonsFinal
      : pokemonsFinal.slice().sort((a, b) => b.id - a.id);
  useEffect(() => {
    handleStart();
  }, [selectedType]);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`,
        ).then((res) => res.json());
        const _pokemonData = await Promise.all(
          response.results.map(async (pokemon) => {
            return await fetch(pokemon.url).then((res) => res.json());
          }),
        );

        const genData = await Promise.all(
          _pokemonData.map(async (data) => {
            const speciesData = await fetch(data.species.url).then((res) =>
              res.json(),
            );
            const generationName = speciesData.generation.name;
            return {
              ...data,
              generation: generationName,
            };
          }),
        );
        setPokemonData(genData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  //butons
  function handleNext() {
    if (pokemonOffset >= pokemonsFinal.length) return;
    setPokemonOffset((o) => o + pokemonPerPage);
  }

  function handleEnd() {
    if (pokemonOffset >= pokemonsFinal.length) return;
    const test = Math.floor(pokemonsFinal.length / pokemonPerPage);
    setPokemonOffset(test * pokemonPerPage + pokemonPerPage);
  }

  function handlePrevious() {
    if (pokemonOffset === 16) return;
    setPokemonOffset((o) => o - pokemonPerPage);
  }

  function handleStart() {
    if (pokemonOffset === 0) return;
    setPokemonOffset(16);
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
  }, []);

  function handleCardClick(pokemon, pokemonColor) {
    console.log(pokemon);
    setIsClicked(true);
    setSelectedPokemon(pokemon);
  }

  function handleSelectType(type) {
    if (selectedType.includes(type))
      return setSelectedType(selectedType.filter((t) => t !== type));
    if (selectedType.length === 2)
      return setSelectedType([selectedType[1], type]);

    setSelectedType([...selectedType, type]);
  }

  function handleSelectGen(gen) {
    if (selectedGen === gen) return setSelectedGen("");
    setSelectedGen(gen);
  }

  return (
    <main className="container">
      {isLoading && <Loader />}
      {!isLoading && !isClicked && (
        <>
          <div className="flex flex-column" style={{ gap: "0.4rem" }}>
            <PokemonTypeBar
              onTypeSelect={handleSelectType}
              selectedType={selectedType}
            />
            <PokemonGenBar
              pokemons={pokemonData}
              onGenSelect={handleSelectGen}
              selectedGen={selectedGen}
            />
          </div>
          <PokemonList
            pokemons={sortedPokemonData.slice(
              pokemonOffset - pokemonPerPage,
              pokemonOffset,
            )}
            onDetails={handleCardClick}
          />
        </>
      )}
      {isClicked && (
        <PokemonDetails pokemon={selectedPokemon} onClick={setIsClicked} />
      )}
      {!isClicked && !isLoading && (
        <div className="nav-bar">
          <input></input>
          <div
            className="flex gap"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translate(-50%)",
            }}
          >
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
