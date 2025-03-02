export function SelectSort({ onSelect }) {
  return (
    <select
      className="nav-bar__select"
      onChange={(e) => onSelect(e.target.value)}
    >
      <option value="ID-Asc">ID &uarr;</option>
      <option value="ID-Desc">ID &darr;</option>
    </select>
  );
}
