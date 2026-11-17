import { useEffect, useRef } from 'react'

// The details view is a native <dialog>. The browser gives us, for free:
//  - Escape closes it
//  - keyboard focus stays inside while it is open (Tab does not escape)
//  - focus goes back to the button that opened it when it closes
export default function ServiceDetails({ service, isSaved, onToggleSave, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  // A click on the dark area around the box lands on the <dialog> itself
  function handleBackdropClick(event) {
    if (event.target === dialogRef.current) dialogRef.current.close()
  }

  return (
    <dialog
      ref={dialogRef}
      className="details"
      aria-labelledby="details-title"
      onClose={onClose}
      onClick={handleBackdropClick}
    >
      <div className="details-body">
        <div className="details-head">
          <span className="icon big" aria-hidden="true">{service.icon}</span>
          <div>
            <span className="tag">{service.category}</span>
            <h2 id="details-title">{service.name}</h2>
          </div>
        </div>

        <p>{service.description}</p>

        <dl className="facts">
          <div><dt>Price</dt><dd>{service.price} MAD</dd></div>
          <div><dt>Duration</dt><dd>{service.duration} min</dd></div>
          <div><dt>Rating</dt><dd>★ {service.rating}</dd></div>
          <div><dt>Provider</dt><dd>{service.provider}</dd></div>
          <div><dt>City</dt><dd>{service.city}</dd></div>
        </dl>

        <div className="actions">
          <button
            type="button"
            className={`save ${isSaved ? 'is-saved' : ''}`}
            aria-pressed={isSaved}
            onClick={() => onToggleSave(service.id)}
          >
            {isSaved ? '♥ Saved' : '♡ Save'}
          </button>
          <button type="button" className="btn" onClick={() => dialogRef.current.close()}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  )
}
