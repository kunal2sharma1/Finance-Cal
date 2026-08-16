import { useEffect, useMemo, useState } from 'react'
import Home from './pages/Home.jsx'
import CalculatorView from './pages/CalculatorView.jsx'
import GuideView from './pages/GuideView.jsx'
import GuidesIndex from './pages/GuidesIndex.jsx'
import TopicHub from './pages/TopicHub.jsx'
import InfoPage from './pages/InfoPage.jsx'
import NotFound from './pages/NotFound.jsx'
import CountryPage from './pages/CountryPage.jsx'
import CountriesIndex from './pages/CountriesIndex.jsx'
import CountrySelector from './components/CountrySelector.jsx'
import { useCountry } from './useCountry.js'
import { getCountryPageBySlug } from './countryPages.js'
import { calculators } from './calculators/registry.js'
import { guides } from './guides.js'
import { topicHubs } from './topicHubs.js'
import { buildCalculatorSEO, setSiteSEO } from './seo.js'
import './site-footer.css'

const HOME_HISTORY_STATE = { finCalcView: 'home' }
const TOPIC_SLUGS = new Set(Object.keys(topicHubs))
const INFO_SLUGS = new Set(['about', 'how-it-works', 'privacy', 'contact'])

function getRouteFromLocation() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/'

  const calculatorMatch = pathname.match(/^\/calculators\/([^/]+)$/)
  if (calculatorMatch) return { type: 'calculator', id: decodeURIComponent(calculatorMatch[1]) }

  const guideMatch = pathname.match(/^\/guides\/([^/]+)$/)
  if (guideMatch) return { type: 'guide', slug: decodeURIComponent(guideMatch[1]) }

  if (pathname === '/guides') return { type: 'guides' }
  if (pathname === '/countries') return { type: 'countries' }

  const countryMatch = pathname.match(/^\/countries\/([^/]+)$/)
  if (countryMatch) return { type: 'country', slug: decodeURIComponent(countryMatch[1]) }

  const hubSlug = pathname.replace(/^\//, '')
  if (TOPIC_SLUGS.has(hubSlug)) return { type: 'hub', slug: hubSlug }
  if (INFO_SLUGS.has(hubSlug)) return { type: 'info', slug: hubSlug }

  if (pathname !== '/') return { type: 'not-found' }

  const hashMatch = window.location.hash.match(/^#calculator\/(.+)$/)
  if (hashMatch) return { type: 'calculator', id: decodeURIComponent(hashMatch[1]) }

  return { type: 'home' }
}

function normalizeLegacyHashUrl() {
  const hashMatch = window.location.hash.match(/^#calculator\/(.+)$/)
  if (!hashMatch) return
  const id = decodeURIComponent(hashMatch[1])
  window.history.replaceState(
    { finCalcView: 'calculator', calculatorId: id },
    '',
    `/calculators/${encodeURIComponent(id)}`,
  )
}

export default function App() {
  const [route, setRoute] = useState(() => getRouteFromLocation())
  const country = useCountry()

  useEffect(() => {
    normalizeLegacyHashUrl()
    setRoute(getRouteFromLocation())

    if (!window.history.state?.finCalcView && getRouteFromLocation().type === 'home') {
      window.history.replaceState(HOME_HISTORY_STATE, '', window.location.pathname + window.location.search)
    }

    function handlePopState() {
      setRoute(getRouteFromLocation())
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const selectedCalculator = useMemo(
    () => route.type === 'calculator' ? calculators.find((item) => item.config.id === route.id) : null,
    [route],
  )
  const selectedGuide = useMemo(
    () => route.type === 'guide' ? guides.find((guide) => guide.slug === route.slug) : null,
    [route],
  )
  const selectedHub = useMemo(
    () => route.type === 'hub' ? topicHubs[route.slug] : null,
    [route],
  )
  const selectedCountry = useMemo(
    () => route.type === 'country' ? getCountryPageBySlug(route.slug) : null,
    [route],
  )

  useEffect(() => {
    if (route.type === 'not-found') return

    if (selectedCalculator) {
      const seo = buildCalculatorSEO(selectedCalculator.config)
      setSiteSEO({ ...seo, pathname: `/calculators/${encodeURIComponent(selectedCalculator.config.id)}`, calculator: true })
      return
    }
    if (selectedGuide) {
      setSiteSEO({ title: selectedGuide.metaTitle, description: selectedGuide.metaDescription, pathname: `/guides/${selectedGuide.slug}` })
      return
    }
    if (route.type === 'guides') {
      setSiteSEO({
        title: 'Financial Guides | Practical Money Explanations | FinCalc',
        description: 'Plain-English financial guides covering investing, loans, salary, budgeting, retirement and major money decisions.',
        pathname: '/guides',
      })
      return
    }
    if (route.type === 'countries') {
      setSiteSEO({
        title: 'Financial Calculators by Country | FinCalc',
        description: 'Explore FinCalc by country, with local currency formatting and country-specific financial tools where available.',
        pathname: '/countries',
      })
      return
    }
    if (selectedCountry) {
      setSiteSEO({
        title: `${selectedCountry.title} | FinCalc`,
        description: selectedCountry.description,
        pathname: `/countries/${selectedCountry.slug}`,
      })
      return
    }
    if (selectedHub) {
      setSiteSEO({ title: selectedHub.metaTitle, description: selectedHub.metaDescription, pathname: `/${selectedHub.slug}` })
      return
    }
    if (route.type === 'info') {
      const infoSEO = {
        about: ['About FinCalc | Simple Financial Calculators', 'Learn what FinCalc is, who its calculators are designed for and what the tools are intended to help you understand.'],
        'how-it-works': ['How FinCalc Calculations Work | Assumptions & Limitations', 'Understand how FinCalc calculators use your inputs, what the results mean and why real-world outcomes can differ from estimates.'],
        privacy: ['Privacy | FinCalc', 'Learn how FinCalc handles information entered into its browser-based financial calculators.'],
        contact: ['Contact FinCalc | Feedback & Calculator Issues', 'Contact FinCalc about calculator errors, confusing results, broken links, accessibility issues or product feedback.'],
      }
      const [title, description] = infoSEO[route.slug]
      setSiteSEO({ title, description, pathname: `/${route.slug}` })
      return
    }
    setSiteSEO({})
  }, [route, selectedCalculator, selectedGuide, selectedHub, selectedCountry])

  function openCalculator(id) {
    const target = `/calculators/${encodeURIComponent(id)}`
    window.history.pushState({ finCalcView: 'calculator', calculatorId: id }, '', target)
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
          <a className="site-header__mark" href="/">FinCalc</a>
          <span className="site-header__tagline">Simple, transparent money math</span>
          <CountrySelector />
        </div>
      </header>

      <main className="site-main">
        {selectedCalculator ? (
          <CalculatorView calculator={selectedCalculator} onBack={goHome} country={country} />
        ) : selectedGuide ? (
          <GuideView guide={selectedGuide} />
        ) : route.type === 'guides' ? (
          <GuidesIndex />
        ) : route.type === 'countries' ? (
          <CountriesIndex />
        ) : selectedCountry ? (
          <CountryPage page={selectedCountry} calculators={calculators} onSelect={openCalculator} />
        ) : selectedHub ? (
          <TopicHub slug={route.slug} calculators={calculators} onSelect={openCalculator} />
        ) : route.type === 'info' ? (
          <InfoPage slug={route.slug} />
        ) : route.type === 'not-found' ? (
          <NotFound />
        ) : (
          <Home calculators={calculators} onSelect={openCalculator} country={country} />
        )}
      </main>

      <footer className="site-footer">
        <nav aria-label="FinCalc information">
          <a href="/guides">Guides</a>
          <a href="/countries">Countries</a>
          <a href="/about">About</a>
          <a href="/how-it-works">How calculations work</a>
          <a href="/privacy">Privacy</a>
          <a href="/contact">Contact</a>
        </nav>
        <p>Calculations are estimates based on the assumptions you enter. FinCalc is not a bank, lender, insurer or financial adviser.</p>
      </footer>
    </div>
  )
}
