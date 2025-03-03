import { PokemonCard } from "./PokemonCard";

export function PokemonList({ pokemons, onDetails }) {
  return (
    <ul className="main-list">
      {pokemons.length > 0 ? (
        pokemons.map((pokemon) => (
          <PokemonCard
            pokemon={pokemon}
            key={pokemon.name}
            onDetails={onDetails}
          />
        ))
      ) : (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          No pokemons found
        </div>
      )}
    </ul>
  );
}
