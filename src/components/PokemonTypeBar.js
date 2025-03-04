import { pokemonColors } from "../img/pokemonColors";
import { PokemonType } from "./PokemonType";

export function PokemonTypeBar({ onTypeSelect, selectedType = [] }) {
  return (
    <div
      style={{
        display: "flex",
        borderBottom: "1px solid #707070",
        paddingBottom: ".4rem",
      }}
    >
      {Object.keys(pokemonColors).map((type, i) => (
        <PokemonType
          key={i}
          type={type}
          onClick={onTypeSelect}
          selectedTypes={selectedType}
        />
      ))}
    </div>
  );
}
