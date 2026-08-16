import { useEffect, useState } from 'react'
import Home from './pages/Home.jsx'
import CalculatorView from './pages/CalculatorView.jsx'
import { calculators } from './calculators/registry.js'
import { buildCalculatorSEO, setSiteSEO } from './seo.js'

const HOME_HISTORY_STATE = { finCalcView: 'home' }

function getCalculatorIdFromLocation() {
  const pathMatch = window.location.pathname.match(/^\/calculators\/([^/]+)\/?$/)
  if (pathMatch) return decodeURIComponent(pathMatch[1])

  // Backward compatibility for the old hash URLs. We immediately migrate them
  // to crawlable path URLs rather than continuing to use fragments.
  const hashMatch = window.location.hash.match(/^#calculator\/(.+)$/)
  if (hashMatch) return decodeURIComponent(hashMatch[1])

  return null
}

function normalizeLegacyHashUrl() {
  const hashMatch = window.location.hash.match(/^#calculator\/(.+)$/)
  if (!hashMatch) return

  const id = decodeURIComponent(hashMatch[1])
  const nextPath = `/calculators/${encodeURIComponent(id)}`
  window.history.replaceState(
    { finCalcView: 'calculator', calculatorId: id },
    '',
    nextPath,
  )
}

export default function App() {
  const [selectedId, setSelectedId] = useState(() => getCalculatorIdFromLocation())

  useEffect(() => {
    normalizeLegacyHashUrl()

    if (!window.history.state?.finCalcView && !getCalculatorIdFromLocation()) {
      window.history.replaceState(HOME_HISTORY_STATE, '', window.location.pathname + window.location.search)
    }

    function handlePopState() {
      setSelectedId(getCalculatorIdFromLocation())
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const selectedCalculator = calculators.find(
    (item) => item.config.id === selectedId,
  )

  useEffect(() => {
    if (selectedCalculator) {
      const seo = buildCalculatorSEO(selectedCalculator.config)
      setSiteSEO({
        ...seo,
        pathname: `/calculators/${encodeURIComponent(selectedCalculator.config.id)}`,
        calculator: true,
      })
      return
    }

    setSiteSEO({})
  }, [selectedCalculator])

  function openCalculator(id) {
    setSelectedId(id)

    const nextUrl = `${window.location.pathname}${window.location.search}`
    const target = `/calculators/${encodeURIComponent(id)}`
    window.history.pushState(
      { finCalcView: 'calculator', calculatorId: id },
      '',
      target,
    )
  }

  function goHome() {
    if (getCalculatorIdFromLocation()) {
      window.history.back()
    } else {
      setSelectedId(null)
    }
  }

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
