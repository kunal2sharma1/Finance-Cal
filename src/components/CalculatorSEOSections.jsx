import { useEffect, useMemo } from 'react'
import { calculatorSEOContent } from '../seoCalculatorContent.js'
import { phase4CalculatorSEOContent } from '../seoPhase4Content.js'

function buildFallbackContent(calculatorId, fields, resultFields) {
  const inputLabels = fields.map((field) => field.label).filter(Boolean).slice(0, 5).join(', ')
  const resultLabels = resultFields.map((field) => field.label).filter(Boolean).slice(0, 5).join(', ')

  return {
    sections: [
      ['What does this calculator do?', `Use this ${calculatorId.replaceAll('-', ' ')} calculator to test a financial scenario from the assumptions you enter. The output is an estimate, not a promise of what will happen in real life.`],
      ['What should you enter?', `Typical inputs include ${inputLabels || 'the values shown in the form'}. Use realistic assumptions and compare more than one scenario when the future is uncertain.`],
      ['How should you read the result?', `The calculator can show ${resultLabels || 'the calculated outcome'}. Treat these figures as planning estimates and check the assumptions before using them for an important financial decision.`],
    ],
    faqs: [
      [`How accurate is the ${calculatorId.replaceAll('-', ' ')} calculator?`, 'It is as accurate as the assumptions and formula supplied to it. Real-world fees, taxes, timing, market returns and product rules can make actual outcomes different.'],
      ['Should I use one scenario?', 'No. Test a reasonable range of inputs rather than relying on one optimistic or pessimistic assumption.'],
      ['Are the results financial advice?', 'No. FinCalc provides calculation and planning tools, not personalised financial advice.'],
    ],
  }
}

export default function CalculatorSEOSections({ calculatorId, config }) {
  const content = useMemo(
    () => calculatorSEOContent[calculatorId] || phase4CalculatorSEOContent[calculatorId] || buildFallbackContent(calculatorId, config?.fields || [], config?.resultFields || []),
    [calculatorId, config],
  )

  useEffect(() => {
    const schemaId = `fincalc-faq-${calculatorId}`
    let schema = document.getElementById(schemaId)
    if (!schema) {
      schema = document.createElement('script')
      schema.id = schemaId
      schema.type = 'application/ld+json'
      document.head.appendChild(schema)
    }

    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: content.faqs.map(([question, answer]) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    })

    return () => schema.remove()
  }, [calculatorId, content])

  return (
    <section className="calc-view__seo-content" aria-labelledby="calculator-guide">
      <span className="calc-view__eyebrow">USEFUL TO KNOW</span>
      <h2 id="calculator-guide">Understand the calculation before you use it</h2>
      <div className="calc-view__seo-sections">
        {content.sections.map(([heading, body]) => (
          <section key={heading} className="calc-view__seo-section">
            <h3>{heading}</h3>
            <p>{body}</p>
          </section>
        ))}
      </div>

      <div className="calc-view__seo-sections" aria-labelledby="calculator-faqs">
        <section className="calc-view__seo-section">
          <h3 id="calculator-faqs">Frequently asked questions</h3>
          {content.faqs.map(([question, answer]) => (
            <div key={question}>
              <strong>{question}</strong>
              <p>{answer}</p>
            </div>
          ))}
        </section>
      </div>
    </section>
  )
}
