# FinCalc Dashboard

A static financial calculator dashboard. React + Vite, plain JavaScript,
no backend, no database, no user data — everything runs in the browser.

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL it prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

This creates a `dist/` folder — that's what gets deployed.

## Project structure

```
src/
  calculators/
    registry.js       <- lists every calculator the app knows about
    sip/
      config.js        <- fields, labels, result definitions
      formula.js        <- the math (pure function, no UI code)
      explanation.js    <- plain-language "how this works" text
  components/
    CalculatorCard.jsx  <- card shown on the home grid
    CalculatorForm.jsx   <- renders inputs from a calculator's config
    ResultPanel.jsx       <- renders results from a calculator's config
  pages/
    Home.jsx              <- the grid of calculator cards
    CalculatorView.jsx     <- form + results for one open calculator
  App.jsx                   <- switches between Home and CalculatorView
  main.jsx                   <- mounts the app
  styles.css                  <- all styling and design tokens
```

## Adding a new calculator (next session)

1. Create a new folder under `src/calculators/`, e.g. `emi/`.
2. Add `config.js`, `formula.js`, and `explanation.js` following the SIP
   folder as a template.
3. Import the three pieces in `src/calculators/registry.js` and add one
   object to the `calculators` array.

No other file needs to change — the form, results, and home card are all
shared components driven by config.
