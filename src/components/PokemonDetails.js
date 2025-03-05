import { useKey } from "../hooks/useKey";
import { Loader } from "./Loader";
import { PokemonDetailAbilities } from "./PokemonDetailAbilities";
import { PokemonDetailBaseInfo } from "./PokemonDetailBaseInfo";
import { PokemonDetailStats } from "./PokemonDetailStats";
import { useState, useEffect } from "react";

export function PokemonDetails({ pokemon, onClick, onTypeSelect }) {
  const [isCardLoading, setisCardLoading] = useState(false);
  const [abilityInfo, setAbilityInfo] = useState([]);

  async function fetchPokemonData() {
    try {
      setisCardLoading(true);
      const abilityInfos = await Promise.all(
        pokemon.abilities.map(async (ability) => {
          const abilityData = await fetch(ability.ability.url).then((res) =>
            res.json()
          );
          return {
            name: abilityData.name,
            ability_info: abilityData.flavor_text_entries
              .filter((a) => a.language.name === "en")
              .at(0).flavor_text,
          };
        })
      );
      setAbilityInfo(abilityInfos);
    } finally {
      setisCardLoading(false);
    }
  }

  useEffect(() => {
    fetchPokemonData();
  }, []);

  useKey("Escape", onClick);

  function handleClose() {
    onClick(false);
    document.title = "Pokedex";
  }

  if (isCardLoading) return <Loader />;

  return (
    <div className="details-container">
      <PokemonDetailBaseInfo pokemon={pokemon} onTypeSelect={onTypeSelect} />
      <PokemonDetailStats pokemon={pokemon} />
      <PokemonDetailAbilities
        pokemon={pokemon}
        setisCardLoading={setisCardLoading}
        abilityInfo={abilityInfo}
      />
      <button className="close-button" onClick={() => handleClose()}>
        &#10554;
      </button>
    </div>
  );
}
