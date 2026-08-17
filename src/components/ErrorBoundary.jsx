import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('FinCalc application error:', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  handleHome = () => {
    window.history.pushState({ finCalcView: 'home' }, '', '/')
    window.dispatchEvent(new PopStateEvent('popstate'))
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <main style={{ maxWidth: 760, margin: '0 auto', padding: '72px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.08em' }}>FINCALC</p>
        <h1>Something went wrong</h1>
        <p style={{ lineHeight: 1.6 }}>
          This calculator could not be displayed correctly. Your inputs were not sent anywhere.
          Try reloading the page or return to the calculators.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button type="button" onClick={this.handleReload}>Reload</button>
          <button type="button" onClick={this.handleHome}>Back to calculators</button>
        </div>
        {import.meta?.env?.DEV && this.state.error ? (
          <pre style={{ marginTop: 32, textAlign: 'left', whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
            {this.state.error.stack || this.state.error.message}
          </pre>
        ) : null}
      </main>
    )
  }
}
