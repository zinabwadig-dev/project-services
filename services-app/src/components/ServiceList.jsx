import ServiceCard from './ServiceCard.jsx'

export default function ServiceList({ services, savedIds, onOpen, onToggleSave }) {
  return (
    <ul className="grid">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          isSaved={savedIds.includes(service.id)}
          onOpen={onOpen}
          onToggleSave={onToggleSave}
        />
      ))}
    </ul>
  )
}
