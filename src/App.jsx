import { useEffect, useState } from 'react'
import Home from './pages/Home.jsx'
import CalculatorView from './pages/CalculatorView.jsx'
import { calculators } from './calculators/registry.js'

const HOME_HISTORY_STATE = { finCalcView: 'home' }

function getCalculatorIdFromLocation() {
  const match = window.location.hash.match(/^#calculator\/(.+)$/)
  return match ? decodeURIComponent(match[1]) : null
}

export default function App() {
  // Calculator selection is mirrored into browser history so the device or
  // browser Back button returns to FinCalc home instead of leaving the site.
  const [selectedId, setSelectedId] = useState(() => getCalculatorIdFromLocation())

  useEffect(() => {
    if (!window.history.state?.finCalcView && !getCalculatorIdFromLocation()) {
      window.history.replaceState(HOME_HISTORY_STATE, '', window.location.href)
    }

    function handlePopState() {
      setSelectedId(getCalculatorIdFromLocation())
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  function openCalculator(id) {
    setSelectedId(id)

    const nextUrl = `${window.location.pathname}${window.location.search}#calculator/${encodeURIComponent(id)}`
    window.history.pushState(
      { finCalcView: 'calculator', calculatorId: id },
      '',
      nextUrl,
    )
  }

  function goHome() {
    if (getCalculatorIdFromLocation()) {
      window.history.back()
    } else {
      setSelectedId(null)
    }
  }

  const selectedCalculator = calculators.find(
    (item) => item.config.id === selectedId
  )

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="site-header__inner">
          <span className="site-header__mark">FinCalc</span>
          <span className="site-header__tagline">
            Simple, transparent money math
          </span>
        </div>
      </header>

      <main className="site-main">
        {selectedCalculator ? (
          <CalculatorView
            calculator={selectedCalculator}
            onBack={goHome}
          />
        ) : (
          <Home calculators={calculators} onSelect={openCalculator} />
        )}
      </main>

      <footer className="site-footer">
        <p>
          All calculations happen in your browser. Nothing you type is sent
          anywhere or stored.
        </p>
      </footer>
    </div>
  )
}
