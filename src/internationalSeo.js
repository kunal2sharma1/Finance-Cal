const SEO = {
  '401k': { title: '401(k) Calculator – Estimate Retirement Contributions | FinCalc', description: 'Estimate employee and employer 401(k) contributions and projected retirement savings using 2026 US contribution limits.' },
  'roth-ira': { title: 'Roth IRA Calculator – Estimate Contribution Room | FinCalc', description: 'Estimate Roth IRA contribution room and projected value using 2026 US contribution limits and income assumptions.' },
  'uk-isa': { title: 'UK ISA Calculator – Estimate ISA Allowance | FinCalc', description: 'Estimate remaining UK ISA allowance and Lifetime ISA bonus using the 2026–27 subscription rules.' },
  'uk-pension': { title: 'UK Pension Allowance Calculator – Estimate Annual Allowance | FinCalc', description: 'Estimate UK pension annual allowance usage using contributions, carry-forward and 2026–27 allowance assumptions.' },
  'canada-tfsa': { title: 'Canada TFSA Calculator – Estimate Contribution Room | FinCalc', description: 'Estimate 2026 TFSA contribution room using the annual limit, unused room and current-year contributions.' },
  'canada-rrsp': { title: 'Canada RRSP Calculator – Estimate Contribution Room | FinCalc', description: 'Estimate basic RRSP contribution room from previous-year earned income, pension adjustment and unused room.' },
  'singapore-cpf': { title: 'Singapore CPF Calculator – Estimate CPF Contributions | FinCalc', description: 'Estimate employee and employer CPF contributions using Singapore 2026 contribution rates and the ordinary wage ceiling.' },
  'australia-super': { title: 'Australian Superannuation Calculator – Estimate Super Contributions | FinCalc', description: 'Estimate Australian super guarantee contributions and projected retirement savings using current SG assumptions.' },
  'uae-end-of-service': { title: 'UAE End of Service Gratuity Calculator | FinCalc', description: 'Estimate UAE private-sector expatriate end-of-service gratuity from basic salary and years of continuous service.' },
}

export function getInternationalSEO(id) {
  return SEO[id] || null
}
