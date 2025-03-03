export function SearchBox({ query, setQuery }) {
  return (
    <div>
      <input
        className="search"
        placeholder="Search pokemons"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      ></input>
      <button className="search-clear" onClick={() => setQuery("")}>
        X
      </button>
    </div>
  );
}
