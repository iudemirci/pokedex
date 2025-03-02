import hidden from "../hidden.png";
import {PokemonType} from "./PokemonType";

export function PokemonDetailBaseInfo({ pokemon }) {
  const pokemonImages = Object.values(pokemon.sprites);
  const pokemonGif = pokemon.sprites.other.showdown.front_default;

  return (
    <div className="flex items-center" style={{ gap: "1.6rem" }}>
      <img
        src={pokemonGif || pokemonImages[4] || hidden}
        alt={pokemon.name}
      ></img>
      <div className="flex flex-column gap">
        <div className="flex gap items-center">
          <span className="details-id">#{pokemon.id}</span>
          <span className="details-name">{pokemon.name}</span>
        </div>

        <div>
          {pokemon.types.map((type, i) => (
            <PokemonType key={i} type={type.type.name} />
          ))}
        </div>

        <div className="flex gap flex-column">
          <div className="flex gap">
            <h4>base expreince</h4>
            <span> {pokemon.base_experience}</span>
          </div>
          <div className="flex gap">
            <h4>weight</h4>
            <span> {pokemon.weight / 10}kg</span>
          </div>
          <div className="flex gap">
            <h4>height</h4>
            <span>{(pokemon.height / 10).toFixed(2)}m</span>
          </div>
        </div>
      </div>
        <span style={{textTransform: "uppercase",
          alignSelf:"flex-end", position:"absolute",
        right:"2.4rem"}}>
            Gen {pokemon.generation.split("-").at(1)}
        </span>
    </div>
  );
}
