export default function ServiceCard({ service, isSaved, onOpen, onToggleSave }) {
  return (
    <li className="card">
      <div className="card-top">
        <span className="icon" aria-hidden="true">{service.icon}</span>
        <span className="tag">{service.category}</span>
      </div>

      <h3>{service.name}</h3>
      <p className="muted">{service.provider} · {service.city}</p>

      <div className="card-bottom">
        <strong>{service.price} MAD</strong>
        <span className="muted">{service.duration} min · ★ {service.rating}</span>
      </div>

      <div className="card-actions">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => onOpen(service.id)}
          aria-label={`View details: ${service.name}`}
        >
          Details
        </button>
        <button
          type="button"
          className={`save ${isSaved ? 'is-saved' : ''}`}
          aria-pressed={isSaved}
          aria-label={`${isSaved ? 'Remove from saved' : 'Save'}: ${service.name}`}
          onClick={() => onToggleSave(service.id)}
        >
          {isSaved ? '♥ Saved' : '♡ Save'}
        </button>
      </div>
    </li>
  )
}
