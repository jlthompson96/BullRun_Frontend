<p align="center">
  <img src="docs/assets/banner.svg" alt="BullRun — track your portfolio, research stocks and build your financial literacy" width="100%">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-66bb6a?style=for-the-badge&logo=react&logoColor=white&labelColor=08201a" alt="React 18">
  <img src="https://img.shields.io/badge/TypeScript-5-66bb6a?style=for-the-badge&logo=typescript&logoColor=white&labelColor=08201a" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-build-66bb6a?style=for-the-badge&logo=vite&logoColor=white&labelColor=08201a" alt="Vite">
  <img src="https://img.shields.io/badge/MUI-6-1976d2?style=for-the-badge&logo=mui&logoColor=white&labelColor=08201a" alt="MUI 6">
  <img src="https://img.shields.io/badge/ApexCharts-charts-1976d2?style=for-the-badge&labelColor=08201a" alt="ApexCharts">
  <img src="https://img.shields.io/badge/backend-Spring_Boot-1976d2?style=for-the-badge&logo=springboot&logoColor=white&labelColor=08201a" alt="Spring Boot backend">
</p>

# BullRun

A React app for managing a stock portfolio and building financial literacy. Look up any ticker, keep track of the shares you own, read the latest headlines, and learn the concepts behind it all (compound interest, P/E ratio, dividend yield, fair value) in the Learning Center.

BullRun is the frontend half of the project. Market data, news and portfolio storage come from the [BullRun Backend](https://github.com/jlthompson96/BullRun_Backend), a Spring Boot API.

<p align="center">
  <img src="docs/assets/screenshots/stock-search.png" alt="Stock Search showing Rocket Lab's price, daily change, previous close and company profile" width="100%">
  <br><sub>Stock Search with live data (captured in 2024, when the page was called Stock Analyzer).</sub>
</p>

## Features

<p align="center">
  <img src="docs/assets/features.svg" alt="BullRun features: Dashboard, Portfolio, Stock Search, Learning Center and News" width="100%">
</p>

- **Stock Search.** Enter a symbol (AAPL, TSLA, MSFT, GOOGL, AMZN…) to get the latest price, the daily change in dollars and percent, the previous close, the company logo and profile, market cap, sector, employee count and website. Price and change turn green or red with the day's move.
- **Portfolio.** A sortable, paginated grid of your holdings (symbol, company, close price, shares owned, current value) with the total current value underneath. Add a stock, update the shares you own, or remove a holding.
- **Learning Center.** Short lessons on stock market basics, investing, compound interest, the P/E ratio, dividend yield, fair value and future value, each with a worked example. Includes an ApexCharts growth curve and a future value calculator you can try.
- **News.** Enter a ticker to pull its latest headlines, with descriptions and publish times.
- **Dashboard.** The landing page that ties the app together.
- **Responsive navigation.** The top app bar collapses into a drawer on small screens.

## Screenshots

<table>
  <tr>
    <td width="50%"><img src="docs/assets/screenshots/compound-interest.png" alt="Compound interest lesson with a worked example and a 40-year growth chart"></td>
    <td width="50%"><img src="docs/assets/screenshots/future-value.png" alt="Future value lesson with the calculator showing $1,628.89 for $1,000 at 5% over 10 years"></td>
  </tr>
  <tr>
    <td align="center"><b>Compound interest</b>: $1,000 at 8% over 40 years</td>
    <td align="center"><b>Future value calculator</b>: try your own numbers</td>
  </tr>
</table>

## How it works

The browser only talks to the Vite dev server. Vite proxies `/stockData` and `/users` to the BullRun backend, which calls the market data providers and stores the portfolio in MongoDB.

```mermaid
flowchart LR
    subgraph Browser["📈 Browser — BullRun"]
        UI["Dashboard · Portfolio · Stock Search<br/>Learning Center · News"]
    end
    UI -- "/stockData/*  /users/*" --> Proxy["Vite dev proxy"]
    Proxy --> API["🐂 BullRun Backend<br/>(Spring Boot)"]
    API --> TD["TwelveData<br/>price · close · logo"]
    API --> PG["Polygon<br/>company profile"]
    API --> YF["Yahoo Finance RSS<br/>news"]
    API <--> DB[("MongoDB<br/>portfolio")]
```

What happens when you search for a ticker:

```mermaid
sequenceDiagram
    participant U as You
    participant S as Stock Search
    participant B as BullRun Backend
    U->>S: Enter "AAPL" and Search
    S->>B: GET /stockData/stockPrice
    S->>B: GET /stockData/companyProfile
    S->>B: GET /stockData/companyLogo
    S->>B: GET /stockData/previousClose
    B-->>S: price, profile, logo, previous close
    S-->>U: Price card, daily change (green / red), company details
```

## Tech stack

React 18, TypeScript, Vite, MUI 6 (with `@mui/x-data-grid`), Axios, React Router, ApexCharts and Sass.

## Getting started

### Prerequisites

- Node.js 22 (see `engines` in [package.json](package.json))
- A running [BullRun Backend](https://github.com/jlthompson96/BullRun_Backend) for live data. The Learning Center works without it.

### Install and run

```bash
git clone https://github.com/jlthompson96/BullRun_Frontend.git
cd BullRun_Frontend
npm install
npm run dev
```

Open http://localhost:5173.

The dev proxy in [vite.config.ts](vite.config.ts) forwards `/stockData` and `/users` to the hosted backend. To use a backend running on your machine, change both targets to its address, for example `http://localhost:8080`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with the API proxy |
| `npm run build` | Type-check and build for production into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint with `--fix` |

## Project structure

```
src/
├── App.tsx              # Theme provider, app bar and footer
├── common/              # App bar + routes, footer, shared types, compound-interest chart
├── components/          # Add stock / update shares modals, index ticker, stock data
├── routes/              # Dashboard, Portfolio, Stock Search, Learning Center, News
└── service/             # Axios instance, stock and user API calls
```
