# SecurePass Pro v2.0

A modern, dashboard-style **password strength analyzer** built for a Computer Science Engineering portfolio. Inspired by professional SaaS dashboards like Stripe, Figma, Notion, and GitHub.

\---

## 🚀 Live Demo

> Deployed on GitHub Pages — \[View Live](#)

\---

## 📁 Project Structure

```
SecurePass-Pro/
├── index.html     # Dashboard layout \& structure
├── style.css      # All styles, themes, and responsive layout
├── script.js      # All JavaScript logic and functionality
└── README.md      # Project documentation
```

\---

## ✨ Features

|#|Feature|Description|
|-|-|-|
|1|Password Strength Checker|Real-time strength analysis on every keystroke|
|2|Progress Bar|4-segment animated strength meter|
|3|Security Score|Weighted score out of 100 with animated ring|
|4|Password Generator|Cryptographically strong 16–19 char passwords|
|5|Smart Suggestions|Dynamic tips based on password weaknesses|
|6|Entropy Calculator|Bits of entropy based on character pool|
|7|Crack Time Estimator|Estimated time at 10 billion guesses/sec|
|8|Common Password Detection|Checks against top common passwords|
|9|Keyboard Pattern Detection|Detects qwerty, asdfgh, 123456, etc.|
|10|Repeated Character Detection|Detects aaa, 1111, password111, etc.|
|11|Personal Info Detection|Detects common names and birth years|
|12|Theme Persistence|Light/Dark theme saved via localStorage|
|13|Responsive Dashboard Layout|Works on mobile, tablet, and desktop|
|14|Animated Bar Chart|Chart.js bar graph with per-category scores|
|15|Glassmorphism Cards|Frosted glass UI with subtle shadows|

\---

## 🎨 Design

* **Dark Theme** — Blue-grey and slate (`#0f172a`, `#1e293b`, `#334155`)
* **Light Theme** — Soft lavender, white, and indigo tones
* **Fonts** — Syne (headings), DM Sans (body), DM Mono (code/metrics)
* **UI Style** — Glassmorphism cards, animated score ring, sticky topbar

\---

## 🛠 Tech Stack

* **HTML5** — Semantic structure
* **CSS3** — CSS variables, glassmorphism, responsive grid
* **JavaScript (ES6+)** — DOM manipulation, regex, localStorage, arrays \& objects
* **Bootstrap 5** — Responsive grid and utility classes
* **Bootstrap Icons** — Icon library
* **Chart.js** — Animated bar chart

\---

## 📊 Scoring Algorithm

The security score is calculated as a weighted sum across 6 categories:

|Category|Weight|
|-|-|
|Length|25%|
|Symbols|20%|
|Uppercase|15%|
|Lowercase|15%|
|Numbers|15%|
|Uniqueness|10%|

\---

## 🔐 Threat Detection

|Threat|Detection Method|
|-|-|
|Common Password|Exact match against a curated list of top passwords|
|Keyboard Pattern|Substring match against common keyboard sequences|
|Repeated Characters|Regex: `(.)\\1{2,}`|
|Personal Information|Common first names + birth year pattern (1950–2029)|

\---

## 📦 Installation

No build tools required. Just clone and open in a browser:

```bash
git clone https://github.com/vishnupriyanr0912/SecurePass-Pro.git
cd SecurePass-Pro
open index.html
```

> Requires internet for CDN assets (Bootstrap, Chart.js, Google Fonts).

\---

## 📄 License

MIT License — free to use for personal and educational projects.

