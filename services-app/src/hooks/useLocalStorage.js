import { useEffect, useState } from 'react'

// Like useState, but the value is also saved in localStorage,
// so it is still there after a refresh.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw === null ? initialValue : JSON.parse(raw)
    } catch {
      // Broken JSON or storage blocked: start from the default value
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage full or blocked: the app still works, it just won't remember
    }
  }, [key, value])

  return [value, setValue]
}
