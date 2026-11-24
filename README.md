# Portfolio

[![CI](https://github.com/mrznur/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/mrznur/portfolio/actions/workflows/ci.yml)

Personal portfolio: a blueprint-themed single page with an interactive terminal and a live Game of 24 solver that demonstrates the dead-end-memory idea from my thesis. Live at https://miraz-nur.netlify.app/

## Features

- **Terminal** with command history (↑/↓), Tab completion, and `/` to focus
- **Game of 24 solver** comparing plain DFS against DFS with dead-end memory
- **Data-driven**: all content lives in `src/data/data.json`
- Accessible (skip link, keyboard nav, `aria-live` output) and responsive

## Structure

```
src/
  App.jsx
  components/   Terminal, Solver, ProjectCard, Title
  lib/          solve24.js (pure logic) + solve24.test.js
  data/         data.json
```

## Scripts

```bash
npm install
npm run dev     # local dev server
npm test        # Vitest unit tests for the solver
npm run build   # production build
```

## Stack

React, Vite, Tailwind CSS, Vitest. Fonts: Instrument Sans + JetBrains Mono.
