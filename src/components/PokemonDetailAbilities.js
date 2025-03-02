import {Popover} from "react-tiny-popover";
import {useEffect, useState} from "react";

export function PokemonDetailAbilities({ pokemon }) {
  const [activeAbility, setActiveAbility] = useState(null);
  const [abilityInfo, setAbilityInfo] = useState([]);

  function handleMouseOver(index) {
    setActiveAbility(index);
  }
  function handleMouseExit() {
    setActiveAbility(null);
  }

  useEffect(() => {
      async function fetchPokemonData() {
          const abilityInfos = await Promise.all(
          pokemon.abilities.map(async (ability) => {
              const abilityData = await fetch(ability.ability.url).then(res => res.json());
              return {
                    name: abilityData.name,
                    ability_info: abilityData.flavor_text_entries[abilityData.flavor_text_entries.length - 1].flavor_text
                };
          }))
        setAbilityInfo(abilityInfos);
      }
      fetchPokemonData()
  },[pokemon.abilities])

  return (
    <div className="flex gap flex-column">
      <h4>Abilities</h4>
      <div className="flex gap">
        {abilityInfo.map((ability, i) => (
          <Popover
            isOpen={activeAbility === i}
            positions={"bottom"}
            content={<div className="ability-desc">{ability.ability_info}</div>}
            key={i}
            padding={4}
            align="start"
          >
            <span
              className="pokemon-ability"
              style={{ textTransform: "capitalize" }}
              onMouseEnter={() => handleMouseOver(i)}
              onMouseLeave={() => handleMouseExit()}
            >
              {ability.name.replace("-", " ")}
            </span>
          </Popover>
        ))}
      </div>
    </div>
  );
}
