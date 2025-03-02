import {pokemonColors} from "./pokemonColors";
import {PokemonType} from "./PokemonType";

export function PokemonTypeBar({onTypeSelect, selectedType}) {
    return <div style={{display: "flex", justifyContent: "space-between", width: "100%"}} >
        {Object.keys(pokemonColors).map((type, i) => <PokemonType key={i} type={type} onClick={onTypeSelect} selectedType={selectedType} />)}
    </div>
}