import CalculatorCard from '../components/CalculatorCard.jsx'

export default function Home({ calculators, onSelect }) {
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
            <div>
              <strong>{calculators.length}+</strong>
              <span>Calculators</span>
            </div>

            <div>
              <strong>₹</strong>
              <span>India-focused</span>
            </div>

            <div>
              <strong>0</strong>
              <span>Data stored</span>
            </div>
          </div>
        </div>

        <div className="home_illustration" aria-hidden="true">
          <div className="illustration_circle"></div>

          <div className="illustration_card illustration_card_main">
            <span>₹</span>
            <strong>Wealth</strong>
            <small>Planning made simple</small>
          </div>

          <div className="illustration_card illustration_card_top">
            ↗
          </div>

          <div className="illustration_card illustration_card_bottom">
            ✓
          </div>
        </div>
      </div>

      <div className="home__grid">
        {calculators.map(({ config }) => (
          <CalculatorCard
            key={config.id}
            config={config}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  )
}