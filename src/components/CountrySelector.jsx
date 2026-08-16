import { useEffect, useState } from 'react'
import {
  countries,
  getCountry,
  getInitialCountry,
  getInitialNumberSystem,
  saveCountry,
  saveNumberSystem,
} from '../country.js'
import { trackEvent } from '../analytics.js'
import './country-selector.css'

export default function CountrySelector() {
  const [countryCode, setCountryCode] = useState(getInitialCountry)
  const [numberSystem, setNumberSystem] = useState(getInitialNumberSystem)
  const country = getCountry(countryCode)

  useEffect(() => {
    function handleCountryChange(event) {
      if (event.detail) setCountryCode(getCountry(event.detail).code)
    }
    function handleNumberSystemChange(event) {
      if (event.detail) setNumberSystem(event.detail)
    }
    window.addEventListener('fincalc-country-change', handleCountryChange)
    window.addEventListener('fincalc-number-system-change', handleNumberSystemChange)
    return () => {
      window.removeEventListener('fincalc-country-change', handleCountryChange)
      window.removeEventListener('fincalc-number-system-change', handleNumberSystemChange)
    }
  }, [])

  function handleCountryChange(event) {
    const nextCode = saveCountry(event.target.value)
    setCountryCode(nextCode)
    trackEvent('country_change', { countryCode: nextCode })
  }

  function handleNumberSystemChange(event) {
    const nextSystem = saveNumberSystem(event.target.value)
    setNumberSystem(nextSystem)
    trackEvent('number_system_change', { numberSystem: nextSystem })
  }

  return (
    <div className="country-selector-group">
      <label className="country-selector">
        <span className="country-selector__label">Country</span>
        <span className="country-selector__control">
          <span aria-hidden="true">{country.flag}</span>
          <select value={country.code} onChange={handleCountryChange} aria-label="Choose your country or region">
            {countries.map((item) => <option key={item.code} value={item.code}>{item.name} ({item.currency})</option>)}
          </select>
        </span>
      </label>
      <label className="country-selector">
        <span className="country-selector__label">Number format</span>
        <span className="country-selector__control">
          <select value={numberSystem} onChange={handleNumberSystemChange} aria-label="Choose number formatting system">
            <option value="indian">Indian (lakh/crore)</option>
            <option value="international">International (million/billion)</option>
          </select>
        </span>
      </label>
    </div>
  )
}
