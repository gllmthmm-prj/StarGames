# ★ StarGames

> **Play Beyond The Universe** — A space-themed web game portal with star knowledge, constellation guides, and bilingual support.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Games](#games)
- [Knowledge Base](#knowledge-base)
- [Internationalisation (i18n)](#internationalisation-i18n)
- [Tech Stack](#tech-stack)
- [API Reference](#api-reference)
- [Easter Egg](#easter-egg)

---

## Overview

StarGames is a Flask-powered web portal offering five space-themed mini-games, a full constellation knowledge guide, a Wiki Stars knowledge base, and a curated collection of astronomy anecdotes — all rendered over an animated starfield background.

The app runs locally on **port 5001** and supports **English** and **French** with persistent language preference via `localStorage`.

---

## Features

| Feature | Description |
|---|---|
| 🎮 5 Mini-games | Quiz, reflex, memory, puzzle, and trivia |
| 🔭 Constellation Guide | 12 major constellations with mythology, key stars, and seasons |
| ★ Wiki Stars | 3-category knowledge base (General, History, Anecdotes) with modal deep-dives |
| 🌌 Animated background | Twinkling stars, Milky Way band, shooting stars, ESA-inspired orbital canvas on game pages |
| 🌐 Bilingual | Full EN / FR translation via i18n.js, persisted in localStorage |
| 🥚 Easter egg | Hidden modal triggered by the 🥚 nav button |

---

## Project Structure

```
StarGames/
├── README.md
├── venv/                        # Python virtual environment
└── src/
    ├── app.py                   # Flask application entry point
    ├── static/
    │   ├── i18n.js              # Bilingual translation system (EN / FR)
    │   └── spacebg.js           # ESA-inspired animated canvas background
    └── templates/
        ├── index.html           # Homepage (hero, games grid, constellations, wiki, anecdotes)
        ├── constellation.html   # Constellation Quiz game
        ├── starcatch.html       # Star Catcher reflex game
        ├── starmemory.html      # Star Memory flip-card game
        ├── dotconnect.html      # Dot Connect puzzle game
        └── numquiz.html         # Galaxy Quiz trivia game
```

---

## Getting Started

### Prerequisites

- Python 3.9+
- pip

### Installation

```bash
# Clone the repository
git clone https://github.com/gllmthmm-prj/StarGames.git
cd StarGames

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate        # macOS / Linux
venv\Scripts\activate           # Windows

# Install dependencies
pip install flask
```

### Run the app

```bash
cd src
python app.py
```

Open your browser at **http://localhost:5001**

---

## Games

### 🔭 Constellation Quiz
Identify 12 star constellations drawn on a canvas. Each round gives you **15 seconds** — answer faster for a speed bonus.
- **10 rounds** · Speed bonus · Progress dots
- Difficulty: **Medium**

### ⭐ Star Catcher
Falling stars appear on screen — click them before they disappear.
- **30-second timer** · Canvas-based gameplay
- Difficulty: **Easy**

### 🧠 Star Memory
Flip cards to match constellation names to their star patterns.
- **3 difficulty levels**: Easy (8 pairs), Medium (10 pairs), Hard (12 pairs)
- Mini constellation canvas drawn on the back of each card
- Difficulty: **Medium**

### 🌠 Dot Connect
Click numbered stars in the correct order to trace a constellation before time runs out.
- **8 rounds** · 20-second timer per round · Speed bonus
- Difficulty: **Hard**

### 🌌 Galaxy Quiz
Rapid-fire space trivia pulled from `/api/quiz/question`. Answers are randomised each question.
- **8 questions** · Streak bonus
- Difficulty: **Easy**

---

## Knowledge Base

### ★ Wiki Stars — from infinity and beyond

Accessed from the homepage via the **Wiki Stars** nav link or section. Three category portals open full-screen modals:

| Category | Articles | Description |
|---|---|---|
| 🔭 General Knowledge | 9 | Stars, constellations, the Milky Way, star types, navigation, deep sky |
| 📜 History | 6 | Babylonians → Copernicus → Galileo → Caroline Herschel → Henrietta Leavitt → CMB |
| 💫 Anecdotes | 6 | Tycho Brahe's nose, Hubble's blurry mirror, Mars Orbiter units crash, Pluto's demotion, Pale Blue Dot, Ceres lost & found |

### Star Constellations Guide

A 12-card knowledge grid styled like the games list, with a featured card for Orion:

| Constellation | Season | Notable Feature |
|---|---|---|
| **Orion** *(featured)* | Winter | Betelgeuse, Rigel, Orion Nebula |
| Ursa Major | Year-round | Contains the Big Dipper |
| Cassiopeia | Year-round | W/M shape, heart of Milky Way |
| Leo | Spring | Regulus on the ecliptic |
| Scorpius | Summer | Antares red giant |
| Gemini | Winter | Geminid meteor shower |
| Taurus | Winter | Pleiades & Hyades clusters |
| Cygnus | Summer | Northern Cross, Deneb |
| Perseus | Autumn | Algol — the Demon Star |
| Virgo | Spring | Virgo Galaxy Cluster (1,300+ galaxies) |
| Andromeda | Autumn | M31 — visible to the naked eye |
| Aquila | Summer | Altair — Summer Triangle |

### Did You Know? — Anecdotes

9 bilingual astronomy anecdote cards at the bottom of the homepage, in a masonry grid layout.

---

## Internationalisation (i18n)

All visible text is managed in `src/static/i18n.js` through a `TRANSLATIONS` object.

```js
// Usage in HTML
<span data-i18n="key">Fallback text</span>

// Usage in JS
const lang = localStorage.getItem('sg_lang') || 'en';
```

**Adding a new translation key:**

1. Open `src/static/i18n.js`
2. Add the key to both `en` and `fr` objects inside `TRANSLATIONS`
3. Add `data-i18n="your_key"` to the HTML element

**Language persistence:** Selected language is saved in `localStorage` under `sg_lang` and restored on every page load and game page.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python 3 · Flask |
| Templating | Jinja2 |
| Frontend | Vanilla JS · CSS3 (no framework) |
| Animation | HTML5 Canvas API |
| Styling | Glassmorphism · CSS Grid · CSS Masonry (columns) |
| i18n | Custom `i18n.js` with localStorage persistence |
| Hosting | Local dev server (Flask debug mode, port 5001) |

---

## API Reference

### `GET /`
Returns the homepage with the full games list injected via Jinja2.

### `GET /game/<game_id>`
Renders the game page for the given ID. Valid IDs:
- `constellation`
- `starcatch`
- `starmemory`
- `dotconnect`
- `numquiz`

Returns homepage if the ID is not found.

### `GET /api/quiz/question`
Returns a randomised trivia question as JSON.

**Response:**
```json
{
  "question": "What is the closest star to Earth?",
  "answers": ["Sirius", "Proxima Centauri", "Vega", "Betelgeuse"],
  "correct": 1
}
```

---

## Easter Egg

Click the **🥚** button in the top-right corner of the navigation bar. A surprise message will appear dedicated to Giulian et Milán ❤️

---

*© 2026 StarGames — Play Beyond The Universe*
