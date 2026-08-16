const SEO = {
  '401k': { title: '401(k) Calculator – Estimate Retirement Contributions | FinCalc', description: 'Estimate employee and employer 401(k) contributions and projected retirement savings using 2026 US contribution limits.' },
  'roth-ira': { title: 'Roth IRA Calculator – Estimate Contribution Room | FinCalc', description: 'Estimate Roth IRA contribution room and projected value using 2026 US contribution limits and income assumptions.' },
  hsa: { title: 'HSA Calculator – Estimate 2026 Contribution Room | FinCalc', description: 'Estimate 2026 HSA contribution limits, remaining room and illustrative growth for self-only or family coverage.' },
  'uk-isa': { title: 'UK ISA Calculator – Estimate ISA Allowance | FinCalc', description: 'Estimate remaining UK ISA allowance and Lifetime ISA bonus using the 2026–27 subscription rules.' },
  'uk-pension': { title: 'UK Pension Allowance Calculator – Estimate Annual Allowance | FinCalc', description: 'Estimate UK pension annual allowance usage using contributions, carry-forward and 2026–27 allowance assumptions.' },
  'uk-lifetime-isa': { title: 'Lifetime ISA Calculator – Estimate 25% Government Bonus | FinCalc', description: 'Estimate UK Lifetime ISA contributions, the 25% government bonus and an illustrative projected value.' },
  'canada-tfsa': { title: 'Canada TFSA Calculator – Estimate Contribution Room | FinCalc', description: 'Estimate 2026 TFSA contribution room using the annual limit, unused room and current-year contributions.' },
  'canada-rrsp': { title: 'Canada RRSP Calculator – Estimate Contribution Room | FinCalc', description: 'Estimate basic RRSP contribution room from previous-year earned income, pension adjustment and unused room.' },
  'canada-fhsa': { title: 'Canada FHSA Calculator – Estimate First Home Savings Room | FinCalc', description: 'Estimate FHSA contribution room and projected value using the C$8,000 annual and C$40,000 lifetime limits.' },
  'singapore-cpf': { title: 'Singapore CPF Calculator – Estimate CPF Contributions | FinCalc', description: 'Estimate employee and employer CPF contributions using Singapore 2026 contribution rates and the ordinary wage ceiling.' },
  'australia-super': { title: 'Australian Superannuation Calculator – Estimate Super Growth | FinCalc', description: 'Estimate employer super guarantee contributions, voluntary contributions and projected super balance using Australian assumptions.' },
  'australia-concessional-super': { title: 'Australia Super Concessional Contribution Calculator | FinCalc', description: 'Estimate concessional super contributions against the A$30,000 general annual cap for the current income year.' },
  'uae-end-of-service': { title: 'UAE End-of-Service Gratuity Calculator | FinCalc', description: 'Estimate UAE private-sector expatriate end-of-service gratuity from basic salary and completed service years.' },
}

export function getInternationalSEO(id) {
  return SEO[id] || null
}
