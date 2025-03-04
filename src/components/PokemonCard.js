import { pokemonColors } from "../img/pokemonColors";
import logo from "../img/logo.png";
import hidden from "../img/hidden.png";
import { PokemonType } from "./PokemonType";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export function PokemonCard({ pokemon, onDetails }) {
  const [isHovered, setIsHovered] = useState(false);
  const pokemonFirstType = pokemon.types.map((pokemon) => pokemon.type.name)[0];
  const typeColor = pokemonColors[pokemonFirstType] || "#f242";
  const pokemonImg = pokemon.sprites.front_default;

  const cardStyle = {
    backgroundImage: `linear-gradient(60deg ,rgba(0, 0, 0, 0.74) 0%,transparent 80%), linear-gradient(60deg, ${typeColor} 100%, black 0%), url(${logo})
    `,
    border: isHovered ? "3px solid #CBCBCBFF" : `3px solid ${typeColor}`,
  };

  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <li
      className="main-list__card"
      style={cardStyle}
      onClick={() => onDetails(pokemon)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <LazyLoadImage
        src={pokemonImg || hidden}
        alt={`Pokemon ${pokemon.name}`}
        width={80}
        height={80}
        placeholderSrc={hidden}
        wrapperClassName={isLoaded ? "" : "loading-pokemon"}
        onLoad={() => setIsLoaded(true)}
      />
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
