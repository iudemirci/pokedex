import { useEffect, useState } from "react";
import { PokemonList } from "./components/PokemonList";
import { Button } from "./components/Button";
import { Loader } from "./components/Loader";

export default function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const pokemonPerPage = 20;
  const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${pokemonPerPage}&offset=${offset}`;

  function handleNext() {
    if (offset === 1300) return;
    setOffset((offset) => (offset += pokemonPerPage));
  }
  function handlePrevious() {
    if (offset === 0) return;
    setOffset((offset) => (offset -= pokemonPerPage));
  }

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const response = await fetch(apiUrl).then((res) => res.json());
        const _pokemonData = await Promise.all(
          response.results.map(async (pokemon) => {
            const pokemonGet = await fetch(pokemon.url).then((res) =>
              res.json()
            );
            return pokemonGet;
          })
        );
        setPokemonData(_pokemonData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [apiUrl]);

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
  }, [handlePrevious]);

  return (
    <main className="container">
      {isLoading ? (
        <Loader />
      ) : (
        <PokemonList pokemons={pokemonData} isLoading={isLoading} />
      )}
      <div style={{ display: "flex", gap: ".6rem", flexShrink: "1" }}>
        <Button onButton={handlePrevious}>&larr;</Button>
        <Button onButton={handleNext}>&rarr;</Button>
      </div>
    </main>
  );
}
