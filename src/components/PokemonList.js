import { PokemonCard } from "./PokemonCard";

export function PokemonList({ pokemons, isLoading }) {
  // console.log(pokemons);

  return (
    <ul className="main-list">
      {pokemons.map((pokemon) => (
        <PokemonCard
          pokemon={pokemon}
          key={pokemon.name}
          isLoading={isLoading}
        />
      ))}
    </ul>
  );
}
