import {PokemonCard} from "./PokemonCard";

export function PokemonList({ pokemons, onDetails, onTypeSelect }) {
  return (
    <ul className="main-list">
      {pokemons.map((pokemon) => (
        <PokemonCard
          pokemon={pokemon}
          key={pokemon.name}
          onDetails={onDetails}
          onTypeSelect={onTypeSelect}
        />
      ))}
    </ul>
  );
}
