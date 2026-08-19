import { useEffect, useState } from 'react'
import { getInitialCountry } from './country.js'
import { getInitialNumberSystem } from './numberSystem.js'

export function useNumberSystem() {
  const [numberSystem, setNumberSystem] = useState(() => getInitialNumberSystem(getInitialCountry()))

  useEffect(() => {
    function handleChange(event) {
      if (event.detail === 'indian' || event.detail === 'international') {
        setNumberSystem(event.detail)
      }
    }

    window.addEventListener('fincalc-number-system-change', handleChange)
    return () => window.removeEventListener('fincalc-number-system-change', handleChange)
  }, [])

  return numberSystem
}
