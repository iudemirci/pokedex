import { PokemonType } from "./PokemonType";

export function PokemonGenBar({ pokemons, onGenSelect, selectedGen }) {
  const pokemonGenData = [
    "generation-i",
    "generation-ii",
    "generation-iii",
    "generation-iv",
    "generation-v",
    "generation-vi",
    "generation-vii",
    "generation-viii",
    "generation-ix",
  ];

  return (
    <div className="flex">
      {pokemonGenData.map((gen) => {
        return (
          <PokemonType
            key={gen}
            type={gen}
            onClick={onGenSelect}
            selectedGen={selectedGen}
          />
        );
      })}
    </div>
  );
}
