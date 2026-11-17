// One component for the three "no list" situations: loading, empty and error.
export default function StateMessage({ type, title, text, actionLabel, onAction }) {
  return (
    <div className={`state state-${type}`} role={type === 'error' ? 'alert' : 'status'}>
      {type === 'loading' && <div className="spinner" aria-hidden="true" />}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
      {onAction && (
        <button type="button" className="btn" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  )
}
