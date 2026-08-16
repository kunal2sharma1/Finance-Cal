import { useEffect, useState } from 'react'
import { countries, getCountry, getInitialCountry, saveCountry } from '../country.js'
import './country-selector.css'

export default function CountrySelector() {
  const [countryCode, setCountryCode] = useState(getInitialCountry)
  const country = getCountry(countryCode)

  useEffect(() => {
    function handleCountryChange(event) {
      if (event.detail) setCountryCode(getCountry(event.detail).code)
    }

    window.addEventListener('fincalc-country-change', handleCountryChange)
    return () => window.removeEventListener('fincalc-country-change', handleCountryChange)
  }, [])

  function handleChange(event) {
    const nextCode = saveCountry(event.target.value)
    setCountryCode(nextCode)
  }

  return (
    <label className="country-selector">
      <span className="country-selector__label">Country</span>
      <span className="country-selector__control">
        <span aria-hidden="true">{country.flag}</span>
        <select
          value={country.code}
          onChange={handleChange}
          aria-label="Choose your country or region"
        >
          {countries.map((item) => (
            <option key={item.code} value={item.code}>
              {item.name} ({item.currency})
            </option>
          ))}
        </select>
      </span>
    </label>
  )
}
