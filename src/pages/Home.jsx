import { useMemo, useState } from 'react'
import CalculatorCard from '../components/CalculatorCard.jsx'
import './home-filters.css'

// Keep familiar categories first, then automatically include every category
// used by a calculator so newly added calculators never disappear from filters.
const CATEGORY_ORDER = [
  'All',
  'Investing',
  'Investing & Markets',
  'Savings',
  'Savings & Investing',
  'Budgeting',
  'Loans',
  'Loans & Debt',
  'Salary & Employment',
  'Retirement',
  'Retirement & Wealth',
  'Tax',
  'Education',
  'Major Financial Decisions',
  'Other',
]

function getDisplayCategory(config) {
  if (config.id === 'education') return 'Education'
  if (config.id === 'goal-based' || config.category === 'Planning') return 'Investing'
  if (['fire', 'retirement', 'net-worth'].includes(config.id)) return 'Retirement'
  if (['Retirement', 'Retirement Planning'].includes(config.category)) return 'Retirement'
  return config.category || 'Other'
}

export default function Home({ calculators, onSelect }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const normalizedCalculators = useMemo(
    () => calculators.map((calculator) => ({
      ...calculator,
      config: {
        ...calculator.config,
        category: getDisplayCategory(calculator.config),
      },
    })),
    [calculators],
  )

  const categories = useMemo(() => {
    const available = new Set(normalizedCalculators.map(({ config }) => config.category))
    const preferred = CATEGORY_ORDER.filter((category) => category === 'All' || available.has(category))
    const additional = [...available]
      .filter((category) => category !== 'All' && !CATEGORY_ORDER.includes(category))
      .sort((a, b) => a.localeCompare(b))

    return [...preferred, ...additional]
  }, [normalizedCalculators])

  const filteredCalculators = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    return normalizedCalculators.filter(({ config }) => {
      const matchesCategory = activeCategory === 'All' || config.category === activeCategory
      const searchableText = [config.title, config.shortDescription, config.category]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      const matchesSearch = !query || searchableText.includes(query)
      return matchesCategory && matchesSearch
    })
  }, [normalizedCalculators, searchTerm, activeCategory])

  const resultLabel = searchTerm.trim()
    ? `${filteredCalculators.length} result${filteredCalculators.length === 1 ? '' : 's'} for "${searchTerm.trim()}"`
    : `${filteredCalculators.length} calculator${filteredCalculators.length === 1 ? '' : 's'}`

  const showAllState = activeCategory === 'All' && !searchTerm.trim()

  return (
    <section className="home">
      <div className="home_intro">
        <span className="home_build_badge" aria-label="Current design build version">v3</span>
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
        <div className="calculator_filter_topline">
          <label htmlFor="calculator-search">Search calculators</label>
          <span className="calculator_filter_count">{resultLabel}</span>
        </div>

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
            <button
              type="button"
              className="calculator_search_clear"
              onClick={() => setSearchTerm('')}
              aria-label="Clear calculator search"
            >
              ×
            </button>
          )}
        </div>

        <div className="calculator_filter_row">
          <span className="calculator_filter_label">Browse by category</span>
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
      </div>

      {filteredCalculators.length > 0 ? (
        <>
          <div className="home_section_header">
            <div>
              <span className="home_section_kicker">{showAllState ? 'FINANCIAL TOOLKIT' : 'SEARCH RESULTS'}</span>
              <h2>{showAllState ? 'Choose a calculator' : 'Matching calculators'}</h2>
            </div>
            <p>
              {showAllState
                ? 'Pick a tool based on the decision you are trying to make.'
                : 'Refine your search or category to narrow the list.'}
            </p>
          </div>

          <div className="home__grid">
            {filteredCalculators.map(({ config }) => (
              <CalculatorCard key={config.id} config={config} onSelect={onSelect} />
            ))}
          </div>
        </>
      ) : (
        <div className="calculator_empty_state">
          <strong>No calculators found</strong>
          <p>Try a different search term or switch to another category.</p>
          <button
            type="button"
            onClick={() => {
              setSearchTerm('')
              setActiveCategory('All')
            }}
          >
            Show all calculators
          </button>
        </div>
      )}
    </section>
  )
}
