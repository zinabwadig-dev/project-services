export default function SavedList({ services, onOpen, onRemove }) {
  return (
    <section className="saved" aria-labelledby="saved-title">
      <h2 id="saved-title">
        Saved <span className="count">{services.length}</span>
      </h2>

      {services.length === 0 ? (
        <p className="muted">Nothing saved yet. Press “Save” on a service and it will appear here.</p>
      ) : (
        <ul className="saved-list">
          {services.map((service) => (
            <li key={service.id}>
              <button type="button" className="link" onClick={() => onOpen(service.id)}>
                {service.name}
              </button>
              <span className="muted">{service.price} MAD</span>
              <button
                type="button"
                className="icon-btn"
                aria-label={`Remove ${service.name} from saved`}
                onClick={() => onRemove(service.id)}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
