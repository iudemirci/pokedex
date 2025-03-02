export function PokemonDetailStats({ pokemon }) {
  const pokemonStats = [
    {
      id: 1,
      title: "Attack",
      value: pokemon.stats[0]?.base_stat,
    },
    {
      id: 2,
      title: "HP",
      value: pokemon.stats[1]?.base_stat,
    },
    {
      id: 3,
      title: "Defense",
      value: pokemon.stats[2]?.base_stat,
    },
    {
      id: 4,
      title: "S.Attack",
      value: pokemon.stats[3]?.base_stat,
    },
    {
      id: 5,
      title: "S.Defense",
      value: pokemon.stats[4]?.base_stat,
    },
    {
      id: 6,
      title: "Speed",
      value: pokemon.stats[5]?.base_stat,
    },
  ];

  return (
    <div className="pokemon-stats">
      {pokemonStats.map((stat) => (
        <div className="flex flex-column items-center" key={stat.title}>
          <h4>{stat.title}</h4>
          <span>{stat.value}</span>
        </div>
      ))}
    </div>
  );
}
