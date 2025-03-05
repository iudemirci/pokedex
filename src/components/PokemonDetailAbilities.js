import { Popover } from "react-tiny-popover";
import { useState } from "react";

export function PokemonDetailAbilities({
  pokemon,
  setisCardLoading,
  abilityInfo,
}) {
  const [activeAbility, setActiveAbility] = useState(null);

  function handleMouseOver(index) {
    setActiveAbility(index);
  }
  function handleMouseExit() {
    setActiveAbility(null);
  }

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
