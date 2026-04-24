# AI Learning Hub

A structured, curated learning platform for AI, LLMs, and agents — from first principles to cutting-edge research. **17 topics, 100+ vetted resources, 3 progressive paths.** No signup, no course drip, no fluff.

**🌐 Live:** https://sahirvhora.github.io/ai-learning-hub/

[![Pages](https://img.shields.io/badge/GitHub%20Pages-live-0071e3)](https://sahirvhora.github.io/ai-learning-hub/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
![Zero dependencies](https://img.shields.io/badge/deps-zero-brightgreen)

---

## What it is

Most "learn AI" pages are either hype or homework. This hub is a calm, structured map of the field with handpicked videos, papers, and tools at each step. Pick a level, work through topics in order, bookmark the resources that matter.

### Features
- **3 learning paths** — Beginner, Intermediate, Expert
- **17 topics** — from "What is AI?" through RAG, MoE, and emerging architectures
- **100+ curated resources** — videos, papers, articles, interactive tools
- **Global search** across topics and resources (`/` to focus)
- **AI glossary** — 24 essential terms, always one click away
- **Progress tracking** — local only, nothing leaves your browser
- **Bookmarks** — star resources to come back to
- **Keyboard-first** — `←/→` navigate topics, `Esc` closes, `/` searches
- **Accessible** — ARIA, skip link, keyboard nav, reduced-motion support
- **Zero dependencies** — plain HTML/CSS/vanilla JS, loads instantly

## Run locally

No build step. Clone and open:

```bash
git clone https://github.com/SahirVhora/ai-learning-hub.git
cd ai-learning-hub
python3 -m http.server 8000
# open http://localhost:8000
```

Or just double-click `index.html` — it works offline too.

## Project structure

```
ai-learning-hub/
├── index.html    # Structure
├── styles.css    # Design system + components
├── data.js       # Learning content, glossary, updates, fun facts
├── app.js        # Search, filter, bookmarks, progress, modals
└── README.md
```

## Contributing

Spotted a broken link? Found a better resource? Open an issue or a PR — `data.js` is the single source of truth for all content.

## License

[MIT](./LICENSE) — free to use, fork, remix.
