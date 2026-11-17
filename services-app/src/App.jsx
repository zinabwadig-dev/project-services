import { useMemo, useState } from 'react'
import { useServices } from './hooks/useServices.js'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import SearchBar from './components/SearchBar.jsx'
import CategoryFilter from './components/CategoryFilter.jsx'
import ServiceList from './components/ServiceList.jsx'
import ServiceDetails from './components/ServiceDetails.jsx'
import SavedList from './components/SavedList.jsx'
import StateMessage from './components/StateMessage.jsx'

export default function App() {
  // 1. Data from the JSON file
  const { services, status, retry } = useServices()

  // 2. What the user is doing
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [selectedId, setSelectedId] = useState(null)

  // 3. Saved ids live in localStorage, so they survive a refresh
  const [savedIds, setSavedIds] = useLocalStorage('saved-services', [])

  // Categories come from the data, so a new category in the JSON just appears
  const categories = useMemo(
    () => [...new Set(services.map((service) => service.category))],
    [services],
  )

  // Search and category filter work together: a service must pass BOTH
  const visibleServices = useMemo(() => {
    const text = query.trim().toLowerCase()
    return services.filter((service) => {
      const matchesCategory = category === 'All' || service.category === category
      const searchable = `${service.name} ${service.description} ${service.provider} ${service.city}`.toLowerCase()
      const matchesText = text === '' || searchable.includes(text)
      return matchesCategory && matchesText
    })
  }, [services, query, category])

  const savedServices = services.filter((service) => savedIds.includes(service.id))
  const selectedService = services.find((service) => service.id === selectedId) ?? null

  function toggleSave(id) {
    setSavedIds((ids) => (ids.includes(id) ? ids.filter((savedId) => savedId !== id) : [...ids, id]))
  }

  function clearFilters() {
    setQuery('')
    setCategory('All')
  }

  return (
    <>
      <header className="site-header container">
        <h1>Local services</h1>
        <p>Find, compare and save services near you.</p>
      </header>

      <main className="container">
        {status === 'success' && (
          <div className="controls">
            <SearchBar value={query} onChange={setQuery} />
            <CategoryFilter categories={categories} active={category} onChange={setCategory} />
          </div>
        )}

        <div className="layout">
          <section aria-label="Services">
            {status === 'loading' && <StateMessage type="loading" title="Loading services…" />}

            {status === 'error' && (
              <StateMessage
                type="error"
                title="We couldn’t load the services"
                text="Check your connection and try again."
                actionLabel="Try again"
                onAction={retry}
              />
            )}

            {status === 'success' && (
              <>
                <p className="result-count" aria-live="polite">
                  {visibleServices.length} of {services.length} services
                </p>

                {visibleServices.length === 0 ? (
                  <StateMessage
                    type="empty"
                    title="No services match"
                    text="Try another word or a different category."
                    actionLabel="Clear filters"
                    onAction={clearFilters}
                  />
                ) : (
                  <ServiceList
                    services={visibleServices}
                    savedIds={savedIds}
                    onOpen={setSelectedId}
                    onToggleSave={toggleSave}
                  />
                )}
              </>
            )}
          </section>

          {status === 'success' && (
            <aside>
              <SavedList services={savedServices} onOpen={setSelectedId} onRemove={toggleSave} />
            </aside>
          )}
        </div>
      </main>

      {selectedService && (
        <ServiceDetails
          key={selectedService.id}
          service={selectedService}
          isSaved={savedIds.includes(selectedService.id)}
          onToggleSave={toggleSave}
          onClose={() => setSelectedId(null)}
        />
      )}
    </>
  )
}
