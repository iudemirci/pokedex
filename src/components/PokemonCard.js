import { pokemonColors } from "./pokemonColors";
import logo from "../logo.png";
import hidden from "../hidden.png";
import { PokemonType } from "./PokemonType";

export function PokemonCard({ pokemon, onDetails }) {
  const pokemonFirstType = pokemon.types.map((pokemon) => pokemon.type.name)[0];
  const typeColor = pokemonColors[pokemonFirstType] || "#f242";
  const pokemonImg = pokemon.sprites.front_default;

  const cardStyle = {
    backgroundImage: `linear-gradient(60deg ,rgba(0, 0, 0, 0.74) 0%,transparent 80%), linear-gradient(60deg, ${typeColor} 100%, black 0%), url(${logo})
    `,
    border: `3px solid ${typeColor}`,
  };

  return (
    <li
      className="main-list__card"
      style={cardStyle}
      onClick={() => onDetails(pokemon)}
    >
      <img src={pokemonImg || hidden} alt={`Pokemon ${pokemon.name}`}></img>
      <div className="flex flex-column" style={{ marginTop: ".6rem" }}>
        <span className="list-card__id">#{pokemon.id}</span>
        <span>{pokemon.name}</span>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "0.6rem",
          left: ".6rem",
        }}
      >
        {pokemon.types.map((type, i) => (
          <PokemonType key={i} type={type.type.name} />
        ))}
      </div>
      <span
        style={{
          textTransform: "uppercase",
          position: "absolute",
          bottom: "0.6rem",
          right: ".6rem",
        }}
      >
        Gen {pokemon.generation.split("-").at(1)}
      </span>
    </li>
  );
}
