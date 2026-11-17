export default function CategoryFilter({ categories, active, onChange }) {
  const options = ['All', ...categories]

  return (
    <div className="chips" role="group" aria-label="Filter by category">
      {options.map((category) => (
        <button
          key={category}
          type="button"
          className="chip"
          aria-pressed={active === category}
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
