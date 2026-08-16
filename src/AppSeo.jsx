import { useEffect, useState } from 'react'
import App from './App.jsx'
import TopicHub from './pages/TopicHub.jsx'
import GuideView from './pages/GuideView.jsx'
import { calculators } from './calculators/registry.js'
import { topicHubs } from './topicHubs.js'
import { getGuide } from './guides.js'
import { setSiteSEO } from './seo.js'

function getSpecialRoute() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const hub = path.match(/^\/(investing|loans|salary|retirement|budgeting|financial-planning)$/)
  if (hub) return { type: 'hub', slug: hub[1] }
  const guide = path.match(/^\/guides\/([^/]+)$/)
  if (guide) return { type: 'guide', slug: decodeURIComponent(guide[1]) }
  return { type: 'app' }
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
      if (hub) setSiteSEO({ title: hub.metaTitle, description: hub.metaDescription, pathname: `/${route.slug}` })
    } else if (route.type === 'guide') {
      const guide = getGuide(route.slug)
      if (guide) setSiteSEO({ title: guide.metaTitle, description: guide.metaDescription, pathname: `/guides/${guide.slug}` })
    }
  }, [route])

  if (route.type === 'app') return <App />

  const hub = route.type === 'hub' ? topicHubs[route.slug] : null
  const guide = route.type === 'guide' ? getGuide(route.slug) : null

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="site-header__inner">
          <a className="site-header__mark" href="/" onClick={(event) => { event.preventDefault(); window.history.pushState({}, '', '/'); setRoute({ type: 'app' }); window.dispatchEvent(new PopStateEvent('popstate')) }}>FinCalc</a>
          <span className="site-header__tagline">Simple, transparent money math</span>
        </div>
      </header>
      <main className="site-main">
        {hub ? (
          <TopicHub slug={route.slug} calculators={calculators} onSelect={(id) => { window.location.href = `/calculators/${encodeURIComponent(id)}` }} />
        ) : guide ? (
          <GuideView guide={guide} />
        ) : null}
      </main>
      <footer className="site-footer">
        <p>All calculations happen in your browser. Nothing you type is sent anywhere or stored.</p>
      </footer>
    </div>
  )
}
