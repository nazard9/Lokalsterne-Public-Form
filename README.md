# Opiny — public review flow (v6 · Untitled UI)

Static HTML/CSS/JS prototype of the customer-facing review flow. No build step, no dependencies.

## Pages

| File | Screen |
|---|---|
| `index.html` | **Public form** — welcome screen → 3 questions (role, services, optional comment) → "Generate my review" |
| `review.html` | **Review preview** — generated review, Short/Detailed, Rewrite, edit, copy & publish on Google / Trustpilot / Clutch |
| `review.html#copied` | **Copied → publish** dialog (opens automatically with `#copied`, or by clicking a platform button) |

## Structure

```
index.html            public form
review.html           review preview + "copied" dialog
assets/css/tokens.css design tokens (colours, type, radius, light + dark themes)
assets/css/styles.css component styles (only what these pages use)
assets/js/app.js      behaviour: steps, validation, auto-advance, saved progress, EN/DE, review text, dialog
```

## Run locally

Open `index.html` directly in a browser, or serve the folder (recommended — localStorage and clipboard behave like production):

```
python3 -m http.server 8000      # then open http://localhost:8000
```
VS Code: the "Live Server" extension works too.

## Useful URL parameters

- `?name=Anna` — personal greeting on the welcome screen ("Hi Anna, welcome!")
- `?brand=7f56d9` — business brand colour for buttons / progress bar (hex without `#`)
- Language: EN/DE switcher top-right; auto-detected from the browser on first visit.

## How it works (app.js)

- Answers and current step are saved in `localStorage` (`opiny-answers-opiny-theme`) — reloading shows "Welcome back — Continue / Start over".
- Single-choice questions auto-advance ~0.5 s after a choice; "Other" opens a text field instead.
- Keyboard: `1–5` pick an option, `Enter` continues.
- Errors appear inline under the question (`aria-invalid`, focus moves to the field).
- Theme: light (default) / dark via the round button bottom-right, stored in `localStorage` (`opiny-theme`).
- All texts live in the `T` object (EN + DE) at the top of `app.js`; review templates in `TX`.

## Demo data

"Northwind Studio", the address, quotes and review texts are placeholders. Replace them in the HTML and in `T` / `TX` in `app.js`, or wire them to the Opiny API.

## Deploy

Any static host. Vercel: import the repo, Framework preset **Other**, no build command.
