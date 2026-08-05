import CalculatorCard from '../components/CalculatorCard.jsx'

export default function Home({ calculators, onSelect }) {
  return (
    <section className="home">
      <div className="home__intro">
        <h1>Calculators that just work.</h1>
        <p>
          Pick one below, enter your numbers, and see results instantly.
          Nothing is saved or sent anywhere.
        </p>
      </div>

      <div className="home__grid">
        {calculators.map(({ config }) => (
          <CalculatorCard key={config.id} config={config} onSelect={onSelect} />
        ))}
      </div>
    </section>
  )
}
