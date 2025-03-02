import { pokemonColors } from "./pokemonColors";
import logo from "../logo.png";
import hidden from "../hidden.png";

export function PokemonCard({ pokemon, isLoading }) {
  const pokemonFirstType = pokemon.types.map((pokemon) => pokemon.type.name)[0];
  const pokemonImg = pokemon.sprites.front_default;

  const cardStyle = {
    backgroundImage: `linear-gradient(60deg ,rgba(0, 0, 0, 0.74) 0%,transparent 80%), linear-gradient(60deg, ${pokemonColors[pokemonFirstType]} 100%, black 0%), url(${logo})
    `,
  };

  return (
    <li className="main-list__card" style={cardStyle}>
      <img src={pokemonImg || hidden} alt={`Pokemon ${pokemon.name}`}></img>
      <span className="list-card__id">#{pokemon.id}</span>
      <span>{pokemon.name}</span>
      <div style={{ gridColumn: "span 2" }}>
        {pokemon.types.map((type) => (
          <span
            className="pokemon-type"
            style={{
              backgroundColor: pokemonColors[type.type.name],
            }}
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </li>
  );
}
