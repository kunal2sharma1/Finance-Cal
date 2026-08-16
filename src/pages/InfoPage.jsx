import { useEffect } from 'react'
import { setSiteSEO } from '../seo.js'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import './info-page.css'

const pages = {
  about: {
    title: 'About FinCalc',
    metaTitle: 'About FinCalc | Simple Financial Calculators',
    metaDescription: 'Learn what FinCalc is, what it is designed to help you calculate, and how we approach clear, practical financial tools.',
    sections: [
      ['What FinCalc is', 'FinCalc is a collection of practical financial calculators designed to make everyday money decisions easier to understand. The goal is to turn common financial questions into clear inputs, transparent calculations and understandable results.'],
      ['Who it is for', 'The calculators are built for ordinary people, not finance specialists. You should be able to use a tool without knowing finance terminology or formulas first.'],
      ['What FinCalc is not', 'FinCalc is not a bank, broker, lender, insurer or investment adviser. Results are estimates based on the assumptions you enter and should not be treated as a guarantee of future outcomes.'],
    ],
  },
  'how-it-works': {
    title: 'How FinCalc Calculations Work',
    metaTitle: 'How FinCalc Calculations Work | Assumptions & Limitations',
    metaDescription: 'Understand how FinCalc calculators use your inputs, what the results mean, and why real-world outcomes can differ from estimates.',
    sections: [
      ['Your inputs drive the result', 'Each calculator uses the numbers, dates or assumptions you provide. Changing an input changes the estimated result immediately.'],
      ['Formulas are simplified for practical use', 'The tools aim to present established financial calculation methods in a way that is understandable to a non-specialist. Individual products and institutions may use additional rules, fees or tax treatment.'],
      ['Estimates are not guarantees', 'Interest rates, taxes, fees, market returns, inflation and product terms can change. Use the result as a planning estimate rather than a promise of what will happen.'],
      ['Check important decisions', 'For large financial decisions, compare the result with the terms of the actual product or speak with an appropriately qualified professional.'],
    ],
  },
  privacy: {
    title: 'Privacy',
    metaTitle: 'Privacy | FinCalc',
    metaDescription: 'Learn how FinCalc handles information entered into its browser-based financial calculators.',
    sections: [
      ['Calculator inputs', 'The calculator interface is designed to perform calculations in your browser. The values you enter into a calculator are not intentionally sent to a FinCalc application server as part of the calculation itself.'],
      ['No account required', 'FinCalc calculators are designed to work without requiring you to create an account or submit personal financial details to use a calculation.'],
      ['Third-party services', 'Hosting, analytics or other third-party services may have their own processing and privacy practices. Review their policies when those services are enabled.'],
    ],
  },
  contact: {
    title: 'Contact FinCalc',
    metaTitle: 'Contact FinCalc | Feedback & Calculator Issues',
    metaDescription: 'Contact FinCalc about calculator errors, confusing results, broken links, accessibility issues or product feedback.',
    sections: [
      ['Report a calculator problem', 'When reporting an issue, include the calculator URL, the inputs you used, the result you expected and what the calculator displayed. This makes the problem much easier to reproduce.'],
      ['Suggest a calculator', 'Useful suggestions should describe the financial decision the calculator would help a person make and the inputs and outputs they would need.'],
      ['Feedback and corrections', 'Accuracy and clarity matter more than adding features quickly. Corrections to formulas, terminology or unclear explanations are especially useful.'],
    ],
  },
}

export default function InfoPage({ slug }) {
  const page = pages[slug]
  if (!page) return null

  useEffect(() => {
    setSiteSEO({
      title: page.metaTitle,
      description: page.metaDescription,
      pathname: `/${slug}`,
    })
  }, [page, slug])

  return (
    <article className="info-page">
      <Breadcrumbs items={[{ label: 'FinCalc', href: '/' }, { label: page.title }]} />
      <header className="info-page__header">
        <span className="info-page__eyebrow">FINCALC INFORMATION</span>
        <h1>{page.title}</h1>
      </header>
      <div className="info-page__content">
        {page.sections.map(([heading, body]) => (
          <section key={heading}>
            <h2>{heading}</h2>
            <p>{body}</p>
          </section>
        ))}
      </div>
    </article>
  )
}
