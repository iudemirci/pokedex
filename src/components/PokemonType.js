import { pokemonColors } from "./pokemonColors";

export function PokemonType({
  type,
  onClick,
  selectedTypes = [],
  selectedGen,
}) {
  const isTypeSelected = selectedTypes.includes(type);
  const isGenSelected = selectedGen === type;

  return (
    <span
      className="pokemon-type"
      style={{
        backgroundColor: pokemonColors[type] || pokemonColors["normal"],
        border: isTypeSelected || isGenSelected ? "1px ridge #fff" : "",
        color: isTypeSelected || isGenSelected ? "black" : "",
      }}
      onClick={
        onClick
          ? () => {
              onClick(type);
            }
          : undefined
      }
    >
      {type}
    </span>
  );
}
