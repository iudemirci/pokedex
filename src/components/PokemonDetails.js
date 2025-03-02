import {PokemonDetailAbilities} from "./PokemonDetailAbilities";
import {PokemonDetailBaseInfo} from "./PokemonDetailBaseInfo";
import {PokemonDetailStats} from "./PokemonDetailStats";

export function PokemonDetails({ pokemon, onClick }) {
  return (
    <div className="details-container">
      <PokemonDetailBaseInfo pokemon={pokemon} />
      <PokemonDetailStats pokemon={pokemon} />
      <PokemonDetailAbilities pokemon={pokemon} />
      <button className="close-button" onClick={() => onClick(false)}>
        &#10554;
      </button>
    </div>
  );
}
