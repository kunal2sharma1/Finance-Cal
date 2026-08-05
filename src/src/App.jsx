import { useState } from 'react'
import Home from './pages/Home.jsx'
import CalculatorView from './pages/CalculatorView.jsx'
import { calculators } from './calculators/registry.js'

export default function App() {
  // null = show the calculator list. Otherwise holds the id of the open calculator.
  const [selectedId, setSelectedId] = useState(null)

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
            onBack={() => setSelectedId(null)}
          />
        ) : (
          <Home calculators={calculators} onSelect={setSelectedId} />
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
