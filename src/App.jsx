import { useEffect, useMemo, useState } from 'react'
import Home from './pages/Home.jsx'
import CalculatorView from './pages/CalculatorView.jsx'
import GuideView from './pages/GuideView.jsx'
import TopicHub from './pages/TopicHub.jsx'
import { calculators } from './calculators/registry.js'
import { guides } from './guides.js'
import { topicHubs } from './topicHubs.js'
import { buildCalculatorSEO, setSiteSEO } from './seo.js'

const HOME_HISTORY_STATE = { finCalcView: 'home' }
const TOPIC_SLUGS = new Set(Object.keys(topicHubs))

function getRouteFromLocation() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/'

  const calculatorMatch = pathname.match(/^\/calculators\/([^/]+)$/)
  if (calculatorMatch) {
    return { type: 'calculator', id: decodeURIComponent(calculatorMatch[1]) }
  }

  const guideMatch = pathname.match(/^\/guides\/([^/]+)$/)
  if (guideMatch) {
    return { type: 'guide', slug: decodeURIComponent(guideMatch[1]) }
  }

  const hubSlug = pathname.replace(/^\//, '')
  if (TOPIC_SLUGS.has(hubSlug)) {
    return { type: 'hub', slug: hubSlug }
  }

  // Backward compatibility for the old hash URLs.
  const hashMatch = window.location.hash.match(/^#calculator\/(.+)$/)
  if (hashMatch) {
    return { type: 'calculator', id: decodeURIComponent(hashMatch[1]) }
  }

  return { type: 'home' }
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
  const [route, setRoute] = useState(() => getRouteFromLocation())

  useEffect(() => {
    normalizeLegacyHashUrl()
    setRoute(getRouteFromLocation())

    if (!window.history.state?.finCalcView && getRouteFromLocation().type === 'home') {
      window.history.replaceState(
        HOME_HISTORY_STATE,
        '',
        window.location.pathname + window.location.search,
      )
    }

    function handlePopState() {
      setRoute(getRouteFromLocation())
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const selectedCalculator = useMemo(
    () => route.type === 'calculator'
      ? calculators.find((item) => item.config.id === route.id)
      : null,
    [route],
  )

  const selectedGuide = useMemo(
    () => route.type === 'guide'
      ? guides.find((guide) => guide.slug === route.slug)
      : null,
    [route],
  )

  const selectedHub = useMemo(
    () => route.type === 'hub' ? topicHubs[route.slug] : null,
    [route],
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

    if (selectedGuide) {
      setSiteSEO({
        title: selectedGuide.metaTitle,
        description: selectedGuide.metaDescription,
        pathname: `/guides/${selectedGuide.slug}`,
      })
      return
    }

    if (selectedHub) {
      setSiteSEO({
        title: selectedHub.metaTitle,
        description: selectedHub.metaDescription,
        pathname: `/${selectedHub.slug}`,
      })
      return
    }

    setSiteSEO({})
  }, [selectedCalculator, selectedGuide, selectedHub])

  function openCalculator(id) {
    const target = `/calculators/${encodeURIComponent(id)}`
    window.history.pushState(
      { finCalcView: 'calculator', calculatorId: id },
      '',
      target,
    )
    setRoute({ type: 'calculator', id })
  }

  function goHome() {
    window.history.pushState(HOME_HISTORY_STATE, '', '/')
    setRoute({ type: 'home' })
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
          <CalculatorView calculator={selectedCalculator} onBack={goHome} />
        ) : selectedGuide ? (
          <GuideView guide={selectedGuide} />
        ) : selectedHub ? (
          <TopicHub
            slug={route.slug}
            calculators={calculators}
            onSelect={openCalculator}
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
