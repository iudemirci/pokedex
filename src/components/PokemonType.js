import {pokemonColors} from "./pokemonColors";

export function PokemonType({type, onClick, selectedType}) {
    console.log(selectedType);
    return <span
        className="pokemon-type"
        style={{
            backgroundColor: pokemonColors[type],
            border: selectedType===type ? "1px ridge #fff" : "",
            color: selectedType===type ? "black" : "",
        }}
        onClick= {onClick ? ()=>{onClick(type)} : undefined}
    >
    {type}
  </span>
}