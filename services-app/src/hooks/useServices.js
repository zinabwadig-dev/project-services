import { useCallback, useEffect, useState } from 'react'

// Loads the services from public/services.json.
// status is one of: 'loading' | 'success' | 'error'
export function useServices() {
  const [services, setServices] = useState([])
  const [status, setStatus] = useState('loading')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setStatus('loading')

    fetch(`${import.meta.env.BASE_URL}services.json`, { signal: controller.signal })
      .then((response) => {
        // fetch only rejects on network errors, so check HTTP errors ourselves
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.json()
      })
      .then((data) => {
        setServices(data)
        setStatus('success')
      })
      .catch((error) => {
        if (error.name === 'AbortError') return // the component was removed, ignore
        setStatus('error')
      })

    // Cancel the request if the component goes away
    return () => controller.abort()
  }, [attempt])

  // Calling retry() changes "attempt", which runs the effect again
  const retry = useCallback(() => setAttempt((n) => n + 1), [])

  return { services, status, retry }
}
