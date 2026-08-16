import assert from 'node:assert/strict'
import { calculate as sip } from '../src/calculators/sip/formula.js'
import { calculate as emi } from '../src/calculators/EMI/formula.js'
import { calculate as cagr } from '../src/calculators/cagr/formula.js'
import { calculate as xirr } from '../src/calculators/xirr/formula.js'

function approx(actual, expected, tolerance, label) {
  assert.ok(Number.isFinite(actual), `${label}: expected a finite number, got ${actual}`)
  assert.ok(Math.abs(actual - expected) <= tolerance, `${label}: expected ${expected}, got ${actual}`)
}

// SIP: ₹5,000/month, 12% annual return, 10 years, invest-at-beginning convention.
const sipResult = sip({ monthlyInvestment: 5000, annualReturnRate: 12, years: 10 })
approx(sipResult.totalValue, 1161695, 1, 'SIP total value')
approx(sipResult.totalInvested, 600000, 0, 'SIP total invested')
approx(sipResult.totalReturns, 561695, 1, 'SIP total returns')

// SIP zero-return edge case.
const zeroSip = sip({ monthlyInvestment: 5000, annualReturnRate: 0, years: 10 })
approx(zeroSip.totalValue, 600000, 0, 'SIP zero-return value')

// EMI: ₹1,00,000 at 12% for 1 year.
const emiResult = emi({ loanAmount: 100000, annualInterestRate: 12, loanTenureYears: 1 })
approx(emiResult.monthlyEMI, 8885, 1, 'EMI monthly payment')
approx(emiResult.totalAmountPayable, 106619, 1, 'EMI total payable')
approx(emiResult.totalInterestPayable, 6619, 1, 'EMI total interest')

// EMI zero-interest edge case.
const zeroEmi = emi({ loanAmount: 120000, annualInterestRate: 0, loanTenureYears: 1 })
approx(zeroEmi.monthlyEMI, 10000, 0, 'EMI zero-interest payment')

// CAGR: 100 -> 161.051 over 5 years = exactly 10% CAGR.
const cagrResult = cagr({ initialInvestment: 100, finalValue: 161.051, years: 5 })
approx(cagrResult.cagr, 10, 0.01, 'CAGR')
approx(cagrResult.absoluteGain, 61, 1, 'CAGR absolute gain')
assert.equal(cagrResult.isValid, true, 'CAGR valid case should be valid')

// CAGR invalid case must not present a valid result.
const invalidCagr = cagr({ initialInvestment: 0, finalValue: 100, years: 5 })
assert.equal(invalidCagr.isValid, false, 'CAGR zero initial investment should be invalid')
assert.match(invalidCagr.message, /greater than zero/i)

// XIRR regression case previously used by the UI: two investments, then receipt.
const xirrResult = xirr({
  cashFlows: [
    { date: '2020-01-01', direction: 'invested', amount: '100000' },
    { date: '2021-06-01', direction: 'invested', amount: '50000' },
    { date: '2025-01-01', direction: 'received', amount: '220000' },
  ],
})
approx(xirrResult.xirr, 8.78, 0.02, 'XIRR regression case')
approx(xirrResult.totalInvested, 150000, 0, 'XIRR total invested')
approx(xirrResult.totalReceived, 220000, 0, 'XIRR total received')

// XIRR invalid cases must never report 0% as a valid return.
const oneFlow = xirr({ cashFlows: [{ date: '2020-01-01', direction: 'invested', amount: '100000' }] })
assert.equal(oneFlow.isValid, false)
assert.equal(oneFlow.xirr, null)

const onlyInvestments = xirr({
  cashFlows: [
    { date: '2020-01-01', direction: 'invested', amount: '100000' },
    { date: '2021-01-01', direction: 'invested', amount: '50000' },
  ],
})
assert.equal(onlyInvestments.isValid, false)
assert.equal(onlyInvestments.xirr, null)

console.log('Formula regression tests passed: SIP, EMI, CAGR and XIRR.')
