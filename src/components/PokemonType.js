import { pokemonColors } from "../img/pokemonColors";

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
        flex: "1",
        whiteSpace: "nowrap",
        textAlign: "center",
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
