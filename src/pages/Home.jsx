import { useMemo, useState } from 'react'
import CalculatorCard from '../components/CalculatorCard.jsx'
import './home-filters.css'

export default function Home({ calculators, onSelect }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(calculators.map(({ config }) => config.category).filter(Boolean))]
    return ['All', ...uniqueCategories]
  }, [calculators])

  const filteredCalculators = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    return calculators.filter(({ config }) => {
      const matchesCategory = activeCategory === 'All' || config.category === activeCategory
      const searchableText = [config.title, config.shortDescription, config.category]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      const matchesSearch = !query || searchableText.includes(query)
      return matchesCategory && matchesSearch
    })
  }, [calculators, searchTerm, activeCategory])

  return (
    <section className="home">
      <div className="home_intro">
        <div className="home_intro_text">
          <span className="home_kicker">SMARTER MONEY DECISIONS</span>
          <h1>Make your money math simple.</h1>
          <p>
            Clear, practical calculators for investing, borrowing,
            saving, retirement, and everyday financial decisions.
          </p>
          <div className="home_intro_stats">
            <div><strong>{calculators.length}+</strong><span>Calculators</span></div>
            <div><strong>₹</strong><span>India-focused</span></div>
            <div><strong>0</strong><span>Data stored</span></div>
          </div>
        </div>

        <div className="home_illustration" aria-hidden="true">
          <div className="illustration_circle"></div>
          <div className="illustration_card illustration_card_main">
            <span>₹</span><strong>Wealth</strong><small>Planning made simple</small>
          </div>
          <div className="illustration_card illustration_card_top">↗</div>
          <div className="illustration_card illustration_card_bottom">✓</div>
        </div>
      </div>

      <div className="calculator_filters" aria-label="Calculator filters">
        <div className="calculator_search">
          <label htmlFor="calculator-search">Search calculators</label>
          <div className="calculator_search_box">
            <span aria-hidden="true">⌕</span>
            <input
              id="calculator-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by name or purpose..."
              autoComplete="off"
            />
            {searchTerm && (
              <button type="button" className="calculator_search_clear" onClick={() => setSearchTerm('')} aria-label="Clear calculator search">×</button>
            )}
          </div>
        </div>

        <div className="calculator_filter_header">
          <span>Browse by category</span>
          <span className="calculator_filter_count">Showing {filteredCalculators.length} of {calculators.length}</span>
        </div>

        <div className="calculator_categories" role="tablist" aria-label="Calculator categories">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={activeCategory === category}
              className={`calculator_category ${activeCategory === category ? 'is-active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filteredCalculators.length > 0 ? (
        <div className="home__grid">
          {filteredCalculators.map(({ config }) => (
            <CalculatorCard key={config.id} config={config} onSelect={onSelect} />
          ))}
        </div>
      ) : (
        <div className="calculator_empty_state">
          <strong>No calculators found</strong>
          <p>Try a different search term or switch to another category.</p>
          <button type="button" onClick={() => { setSearchTerm(''); setActiveCategory('All') }}>
            Show all calculators
          </button>
        </div>
      )}
    </section>
  )
}
