import { useRef } from "react";
import { useKey } from "../hooks/useKey";

export function SearchBox({ query, setQuery }) {
  const inputEl = useRef(null);
  useKey("Enter", () => {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
  });

  return (
    <div>
      <input
        className="search"
        placeholder="Search pokemons"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
      ></input>
      <button className="search-clear" onClick={() => setQuery("")}>
        X
      </button>
    </div>
  );
}
