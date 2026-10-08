# Design System

The same editorial rules as KoziLoft and FLAMA, adapted for a personal
portfolio. Every value lives in `style.css` as a custom property. Change the
token, not the component.

The test for every choice: would a real studio ship this, or does it look
generated? When unsure, use less colour, more whitespace, a serif headline,
and a hairline rule instead of a shadow.

## 1. Position

A portfolio is a reading experience. The work is the content, so the page
stays quiet: paper ground, near black ink, two typefaces, hairline rules,
generous margins. Specifics are the marketing. Write "surveyed 20 students and
built the entire front end" rather than "passionate about great experiences."

## 2. Colour

90% paper and ink, 10% one accent, 0% everything else.

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#FAFAF7` | Page ground. Warm, never pure white. |
| `--surface` | `#F1F0EB` | Alternate band, image mats. |
| `--ink` | `#121211` | Primary text, the dark contact band. |
| `--ink-soft` | `#2E2E2C` | Navigation, secondary headings. |
| `--muted` | `#5E5E59` | Supporting copy, metadata, spec keys. |
| `--line` | `#DEDDD6` | Hairlines, 1px only. |
| `--accent` | `#004225` | Links on hover, focus, small highlights only. |
| `--on-dark` | `#F1F0EB` | Text on the dark band. |
| `--on-dark-muted` | `#A3A39C` | Secondary text on the dark band. |

Rules of use:

- The accent is never a large background and never decorative. If a section
  looks flat without colour, it needs whitespace or a rule, not colour.
- The contact band and footer invert to `--ink`. That is the only inversion.
- No dark mode.

### Verified contrast (WCAG AA, 4.5:1)

| Pair | Ratio |
|---|---|
| ink on paper | 17.9 |
| muted on paper | 6.2 |
| muted on surface | 5.7 |
| accent on paper | 11.1 |
| on-dark on ink | 16.4 |
| on-dark-muted on ink | 7.4 |

## 3. Type

Two families with different jobs. They never trade places.

**Newsreader** (serif, 300 and 400, italic for asides) carries the name,
headlines, stat numbers and long prose leads.

**Geist** (grotesk, 400 and 500) carries body copy, labels, navigation,
buttons and spec tables.

| Token | Size | Family | Use |
|---|---|---|---|
| `--t-display` | 3rem to 7rem | Newsreader 300 | One per page, top only |
| `--t-title` | 2rem to 3rem | Newsreader 300 | Section headlines, project names |
| `--t-heading` | 1.375rem to 1.625rem | Newsreader 400 | Subsections |
| `--t-lede` | 1.25rem to 1.5rem | Newsreader 300 | Intro paragraph under a headline |
| `--t-body` | 1rem to 1.0625rem | Geist 400 | Prose |
| `--t-ui` | 0.9375rem | Geist 400/500 | Navigation, buttons, spec values |
| `--t-label` | 0.75rem | Geist 500 | Eyebrows, spec keys |
| `--t-stat` | 3.5rem to 5.5rem | Newsreader 300 | Numbers as pull quotes |

Non negotiables:

- Display and title at `line-height: 1.04`, `letter-spacing: -0.02em`.
- Eyebrow labels sit above every section headline and every project. They are
  the only uppercase text in the system (`0.14em` tracking). Body copy is never
  uppercase.
- Prose caps at `66ch`.
- Numbers are hero content: large serif, never a dashboard tile.

## 4. Space and layout

8px base. Steps: 8, 16, 24, 40, 64, 104, 168. Anything between two steps is a
mistake.

- Page margin `clamp(20px, 5vw, 72px)`, max width `1360px`.
- Section rhythm: 168px desktop, 64px mobile. Sections do not set their own
  outer margins.
- Header is slim and sticky at 72px with a hairline underneath.

## 5. Components

- **Hairline rule.** `1px solid var(--line)`. Separates sections, project rows
  and spec rows. No cards, no boxes, no shadows.
- **Buttons.** Primary is ink fill, paper text, 2px radius, `16px 32px`. Hover
  shifts the fill to the accent. Quiet is ink text with a 1px underline offset
  4px; hover turns the underline accent. Nothing moves or scales.
- **Spec table.** Key in `--t-label` muted, value in `--t-ui` ink, hairline
  between rows, no outer border. Used for project goals, roles and skills.
- **Project row.** 3:2 image mat on `--surface`, then eyebrow, serif title,
  prose, spec table, quiet link.
- **Skills.** Plain text separated by a middot. Never tags or chips.

## 6. Motion

- Hover and focus: `200ms cubic-bezier(0.4, 0, 0.2, 1)`.
- Section reveal on scroll: 600ms fade with a 12px rise, once.
- Everything collapses to zero under `prefers-reduced-motion: reduce`.
- Without JavaScript every section is visible.

## 7. Accessibility floor

- Focus is a 2px accent outline at 2px offset on every interactive element.
- Tap targets are 44px minimum.
- Images carry alt text describing what they show.

## 8. Forbidden

- Gradients, glow, blurred blobs, glassmorphism, decorative `box-shadow`.
- Border radius above 2px and anything pill shaped.
- `hover: scale`, bounce, parallax.
- A second accent colour.
- Emoji, arrow glyphs standing in for words.
- Em dashes, en dashes, the ellipsis character, curly quotes. Use a full stop,
  colon, comma or middot instead.
- Adjectives with no referent: passionate, innovative, cutting edge, seamless.
