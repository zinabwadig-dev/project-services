export default function SearchBar({ value, onChange }) {
  return (
    <div className="field">
      <label htmlFor="search">Search services</label>
      <input
        id="search"
        type="search"
        value={value}
        placeholder="Try “clean”, “lesson” or “El Jadida”"
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}
