import { useEffect, useState } from 'react'
import App from './App.jsx'
import TopicHub from './pages/TopicHub.jsx'
import GuideView from './pages/GuideView.jsx'
import DecisionJourney from './pages/DecisionJourney.jsx'
import JourneysIndex from './pages/JourneysIndex.jsx'
import CountrySelector from './components/CountrySelector.jsx'
import { calculators } from './calculators/registry.js'
import { topicHubs } from './topicHubs.js'
import { canonicalGuideContent, getContentBySlug } from './contentModel.js'
import { getDecisionJourney } from './decisionJourneys.js'
import { setSiteSEO } from './seo.js'

function getSpecialRoute() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const hub = path.match(/^\/(investing|loans|salary|retirement|budgeting|financial-planning)$/)
  if (hub) return { type: 'hub', slug: hub[1] }
  const guide = path.match(/^\/guides\/([^/]+)$/)
  if (guide) return { type: 'guide', slug: decodeURIComponent(guide[1]) }
  if (path === '/journeys') return { type: 'journeys' }
  const journey = path.match(/^\/journeys\/([^/]+)$/)
  if (journey) return { type: 'journey', slug: decodeURIComponent(journey[1]) }
  return { type: 'app' }
}

function getCanonicalGuide(slug) {
  return getContentBySlug(`guide:${slug}`) || canonicalGuideContent.find((guide) => guide.slug === `guide:${slug}`) || null
}

function toGuideViewModel(guide) {
  if (!guide) return null
  return {
    slug: guide.slug.replace(/^guide:/, ''),
    topic: guide.topic,
    title: guide.title,
    metaTitle: guide.metaTitle,
    metaDescription: guide.metaDescription,
    intro: guide.summary,
    sections: guide.body.map(({ heading, text }) => [heading, text]),
    calculatorLinks: guide.links.map(({ title, href }) => [title, href]),
  }
}

export default function AppSeo() {
  const [route, setRoute] = useState(getSpecialRoute)

  useEffect(() => {
    const onPopState = () => setRoute(getSpecialRoute())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    if (route.type === 'hub') {
      const hub = topicHubs[route.slug]
      if (hub) setSiteSEO({ title: hub.metaTitle, description: hub.metaDescription, pathname: `/${route.slug}`, routeType: 'hub' })
      else setSiteSEO({ title: 'Page not found | FinCalc', description: 'The requested FinCalc page could not be found.', pathname: window.location.pathname, routeType: 'not-found', routeExists: false })
    } else if (route.type === 'guide') {
      const guide = getCanonicalGuide(route.slug)
      if (guide) setSiteSEO({ title: guide.metaTitle, description: guide.metaDescription, pathname: `/guides/${guide.slug.replace(/^guide:/, '')}`, routeType: 'guide' })
      else setSiteSEO({ title: 'Guide not found | FinCalc', description: 'The requested FinCalc guide could not be found.', pathname: window.location.pathname, routeType: 'guide', routeExists: false })
    } else if (route.type === 'journeys') {
      setSiteSEO({ title: 'Decision Journeys | Financial Calculators | FinCalc', description: 'Explore FinCalc decision journeys that connect related calculators, guides and next steps around common financial decisions.', pathname: '/journeys', routeType: 'journeys' })
    } else if (route.type === 'journey') {
      const journey = getDecisionJourney(route.slug)
      if (journey) setSiteSEO({ title: `${journey.title} | FinCalc`, description: journey.summary, pathname: `/journeys/${journey.slug}`, routeType: 'journey' })
      else setSiteSEO({ title: 'Journey not found | FinCalc', description: 'The requested FinCalc journey could not be found.', pathname: window.location.pathname, routeType: 'journey', routeExists: false })
    }
  }, [route])

  if (route.type === 'app') return <App />

  const hub = route.type === 'hub' ? topicHubs[route.slug] : null
  const guide = route.type === 'guide' ? toGuideViewModel(getCanonicalGuide(route.slug)) : null
  const journey = route.type === 'journey' ? getDecisionJourney(route.slug) : null

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="site-header__inner">
          <a className="site-header__mark" href="/" onClick={(event) => { event.preventDefault(); window.history.pushState({}, '', '/'); setRoute({ type: 'app' }); window.dispatchEvent(new PopStateEvent('popstate')) }}>FinCalc</a>
          <span className="site-header__tagline">Simple, transparent money math</span>
          <CountrySelector />
        </div>
      </header>
      <main className="site-main">
        {route.type === 'journeys' ? (
          <JourneysIndex />
        ) : hub ? (
          <TopicHub slug={route.slug} calculators={calculators} onSelect={(id) => { window.location.href = `/calculators/${encodeURIComponent(id)}` }} />
        ) : guide ? (
          <GuideView guide={guide} />
        ) : journey ? (
          <DecisionJourney journey={journey} />
        ) : null}
      </main>
      <footer className="site-footer">
        <p>All calculations happen in your browser. Nothing you type is sent anywhere or stored.</p>
      </footer>
    </div>
  )
}
