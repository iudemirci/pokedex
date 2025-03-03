import { PokemonType } from "./PokemonType";

export function PokemonGenBar({ pokemons, onGenSelect, selectedGen }) {
  const pokemonGenData = pokemons
    .map((pokemon) => pokemon.generation)
    .filter((gen) => gen);
  const filteredPokemonGenData = [...new Set(pokemonGenData)];

  return (
    <div className="flex">
      {filteredPokemonGenData.map((gen) => {
        // const genText = `Gen ${gen.split("-", 2).at(1).toUpperCase()}`;
        return (
          <PokemonType
            type={gen}
            onClick={onGenSelect}
            selectedGen={selectedGen}
          />
        );
      })}
    </div>
  );
}
