import {pokemonColors} from "./pokemonColors";

export function PokemonType({type, onClick}) {
    return <span
        className="pokemon-type"
        style={{
            backgroundColor: pokemonColors[type],
        }}
        onClick= {onClick ? ()=>{onClick(type)} : undefined}
    >
    {type}
  </span>
}