import { PokemonDetailAbilities } from "./PokemonDetailAbilities";
import { PokemonDetailBaseInfo } from "./PokemonDetailBaseInfo";
import { PokemonDetailStats } from "./PokemonDetailStats";

export function PokemonDetails({ pokemon, onClick, onTypeSelect }) {
  return (
    <div className="details-container">
      <PokemonDetailBaseInfo pokemon={pokemon} onTypeSelect={onTypeSelect} />
      <PokemonDetailStats pokemon={pokemon} />
      <PokemonDetailAbilities pokemon={pokemon} />
      <button className="close-button" onClick={() => onClick(false)}>
        &#10554;
      </button>
    </div>
  );
}
