# Accessibility — WCAG 2.2 AA Audit Checklist

Organized by what you can actually verify in a browser session. Cite findings as "WCAG <number> <name>" (e.g., "WCAG 1.4.3 Contrast (Minimum)"). Run [scripts/a11y-check.js](../scripts/a11y-check.js) first — it covers the programmatic checks — then verify its candidates and do the manual checks below.

**Severity calibration**: accessibility failures that make content or functions *unreachable* for a user group (keyboard traps, unlabeled forms, missing alt on functional images) are Critical or High — these exclude people, not inconvenience them. Cosmetic or partial issues (slightly low contrast on secondary text) are Medium.

## What the script checks (verify, don't re-do)

- Images missing `alt` attributes (1.1.1) — empty `alt=""` is *correct* for decorative images; flag only images carrying information or function.
- Form inputs without an associated label (1.3.1, 3.3.2, 4.1.2).
- Heading hierarchy: missing `h1`, skipped levels (1.3.1).
- Text contrast below 4.5:1 (3:1 for large text ≥24px or bold ≥18.7px) (1.4.3). The script's contrast math ignores gradients/images behind text — spot-check those manually from screenshots.
- Missing landmarks: no `<main>`, no `<nav>` (1.3.1).
- Vague link text: "click here", "read more", "learn more" with no accessible context (2.4.4).
- Missing `lang` attribute on `<html>` (3.1.1).
- Small tap targets < 24×24px (2.5.8).
- Positive `tabindex` values (2.4.3) and `autoplay` media (1.4.2).

## Manual checks — keyboard (2.1.1, 2.4.3, 2.4.7, 2.1.2)

Put the mouse aside and Tab through the main page and one key flow:

- Can you reach every interactive element — nav, buttons, links, form fields, custom widgets (dropdowns, carousels, star ratings)?
- Is there a **visible focus indicator** at every stop? Outline suppressed via CSS with no replacement is one of the most common High findings on styled sites.
- Is focus order logical (follows visual order)?
- Can you *operate* controls with Enter/Space, and close modals with Escape?
- Keyboard traps: anywhere you can Tab into but not out of (embedded widgets, chat popups) — Critical.
- Is there a skip-to-content link as the first Tab stop on content-heavy pages? (2.4.1 — Medium if missing.)

## Manual checks — visual (1.4.x)

- Zoom the page to 200%: does content remain usable without horizontal scrolling or overlap? (1.4.4, 1.4.10)
- Is color the *only* carrier of meaning anywhere? Red-only error fields, green/red status dots without text or icons, link distinguished from body text by color alone (1.4.1).
- Text over images/gradients: readable at the worst spot, not just on average.
- Motion: carousels, auto-advancing content, animations — is there a pause control? Does anything flash? (2.2.2)

## Manual checks — structure and semantics

- Are "buttons" real `<button>`/`<a>` elements? Clickable `<div>`s and `<span>`s (check the a11y-check script output and the DOM) are invisible to assistive tech and keyboards (4.1.2).
- Do custom components (accordions, tabs, menus) expose state — `aria-expanded`, `aria-selected`? Spot-check one or two; don't exhaustively audit ARIA.
- Page `<title>` describes the page and changes across pages (2.4.2).
- Do error messages get announced — are they associated with fields (`aria-describedby`) or in a live region? At minimum, is the error *text* (not just a red border) present? (3.3.1, 3.3.3)

## Manual checks — forms and flows

- Labels persist while typing (placeholder-only fails 3.3.2).
- Required-field indication doesn't rely on color alone.
- Session/time limits in flows: any timeout without warning or extension option (2.2.1)?

## What this audit can't cover — say so in the report

A browser-session audit cannot fully verify screen-reader behavior (NVDA/JAWS/VoiceOver), cognitive walkthroughs with real users, or full WCAG conformance. Include one line in the report's accessibility section noting the audit is an expert review of detectable issues, and recommend a screen-reader pass (and user testing) if the site serves the public or is legally obligated (ADA, EAA, Section 508).
