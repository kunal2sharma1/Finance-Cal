import { useEffect, useState } from 'react'
import { getCountry, getInitialCountry } from './country.js'

export function useCountry() {
  const [countryCode, setCountryCode] = useState(getInitialCountry)

  useEffect(() => {
    function handleChange(event) {
      if (event.detail) setCountryCode(getCountry(event.detail).code)
    }

    window.addEventListener('fincalc-country-change', handleChange)
    return () => window.removeEventListener('fincalc-country-change', handleChange)
  }, [])

  return getCountry(countryCode)
}
