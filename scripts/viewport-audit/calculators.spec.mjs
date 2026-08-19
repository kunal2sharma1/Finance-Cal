import { test, expect } from '@playwright/test'
import { calculators } from '../../src/calculatorCatalog.js'
import { getNextCalculatorRecommendations } from '../../src/decisionJourneys.js'

const VIEWPORT_LABELS = new Set(['desktop', 'tablet', 'mobile'])

for (const calculator of calculators) {
  const id = calculator.config.id
  const title = calculator.config.title

  test.describe(`${id} — ${title}`, () => {
    test('renders without runtime errors or horizontal overflow', async ({ page }, testInfo) => {
      expect(VIEWPORT_LABELS.has(testInfo.project.name)).toBeTruthy()

      const consoleErrors = []
      const pageErrors = []
      page.on('console', (message) => {
        if (message.type() === 'error') consoleErrors.push(message.text())
      })
      page.on('pageerror', (error) => pageErrors.push(error.message))

      // Do not wait for networkidle here. Some calculators intentionally perform
      // live-data requests, and an external request can remain open long enough
      // to make a healthy page fail the viewport audit. The audit itself should
      // validate document readiness plus the rendered calculator UI, not the
      // completion of external network activity.
      const response = await page.goto(`/calculators/${encodeURIComponent(id)}`, { waitUntil: 'domcontentloaded' })
      expect(response, `${id} did not return a response`).not.toBeNull()
      expect(response.status(), `${id} returned an HTTP error`).toBeLessThan(400)

      await expect(page.locator('h1')).toContainText(title)
      await expect(page.locator('.calc-view__grid')).toBeVisible()

      const nextRecommendations = getNextCalculatorRecommendations(id)
      const nextSection = page.locator('#what-next')
      if (nextRecommendations.length > 0) {
        await expect(nextSection, `${id} should expose the next-calculator decision section`).toBeVisible()
        await expect(page.locator('.next-calculator__link')).toHaveCount(nextRecommendations.length)
      } else {
        await expect(nextSection, `${id} should not expose an empty next-calculator section`).toHaveCount(0)
      }

      await page.waitForTimeout(250)

      const layout = await page.evaluate(() => {
        const viewportWidth = window.innerWidth
        const documentWidth = document.documentElement.scrollWidth
        const bodyWidth = document.body.scrollWidth
        const overflow = Math.max(0, documentWidth - viewportWidth, bodyWidth - viewportWidth)

        const controls = Array.from(document.querySelectorAll('input, select, textarea, button, a'))
          .filter((element) => {
            const style = window.getComputedStyle(element)
            const rect = element.getBoundingClientRect()
            return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0
          })
          .map((element) => {
            const rect = element.getBoundingClientRect()
            return {
              tag: element.tagName,
              text: (element.textContent || '').trim().slice(0, 80),
              right: rect.right,
              left: rect.left,
              width: rect.width,
              viewportWidth,
            }
          })
          .filter((item) => item.right > viewportWidth + 1 || item.left < -1)

        return { viewportWidth, documentWidth, bodyWidth, overflow, controls }
      })

      expect(consoleErrors, `${id} produced console errors: ${consoleErrors.join(' | ')}`).toEqual([])
      expect(pageErrors, `${id} produced page errors: ${pageErrors.join(' | ')}`).toEqual([])
      expect(layout.overflow, `${id} overflows viewport ${layout.viewportWidth}px by ${layout.overflow}px`).toBeLessThanOrEqual(1)
      expect(layout.controls, `${id} has controls outside the viewport: ${JSON.stringify(layout.controls)}`).toEqual([])
    })
  })
}
