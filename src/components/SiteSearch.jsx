import { useEffect, useRef, useState } from 'react'
import { searchSite } from '../searchCatalog.js'
import './site-search.css'

export default function SiteSearch({ country }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [results, setResults] = useState([])
  const inputRef = useRef(null)

  useEffect(() => {
    const next = searchSite(query, { countryCode: country?.code })
    setResults(next)
  }, [query, country?.code])

  useEffect(() => {
    function onKeyDown(event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        inputRef.current?.focus()
        setOpen(true)
      }
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div className="site-search">
      <div className="site-search__box">
        <span aria-hidden="true">⌕</span>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search calculators & guides"
          aria-label="Search calculators and financial guides"
        />
        <kbd>Ctrl K</kbd>
      </div>

      {open && query.trim() && (
        <div className="site-search__results" role="listbox">
          {results.length ? results.map((result) => (
            <a key={`${result.type}-${result.href}`} href={result.href} className="site-search__result">
              <span className="site-search__result-type">{result.type === 'calculator' ? 'Calculator' : 'Guide'}</span>
              <strong>{result.title}</strong>
              <small>{result.description}</small>
            </a>
          )) : (
            <div className="site-search__empty">No matching calculators or guides.</div>
          )}
        </div>
      )}
    </div>
  )
}
