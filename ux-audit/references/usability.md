# Usability Principles — Web Audit Checklist

Practical usability beyond the 10 heuristics: navigation architecture, forms, layout, responsiveness, and perceived performance. Use the principle names below in the finding's `heuristic` field (e.g., "Navigation clarity", "Form usability", "Mobile responsiveness").

## Navigation and information architecture

- **Five-second test**: from the homepage screenshot alone, can you tell what the site offers and who it's for? If you (with full context) hesitate, a first-time visitor is lost.
- Primary navigation: 7±2 top-level items is a guideline, not a law — but 10+ items or vague labels ("Solutions", "Resources", "More") signal IA problems.
- Labels should be front-loaded and specific: "Pricing" beats "See what it costs", "Plans & Pricing" beats "Offerings".
- Every page should answer: Where am I? What's here? Where can I go? (active nav state, page title, clear onward paths).
- Clicking the logo returns to the homepage.
- Footer should carry the expected utility links (contact, privacy, terms); check links actually work.
- Search, if present: test it with a realistic query AND a misspelled one. No-results pages should suggest alternatives, not dead-end.
- Orphan checks: can you reach every advertised key page from the navigation, or do some exist only via deep links?

## Forms

Forms are where users do work, so friction here costs conversions directly.

- Every input needs a **visible, persistent label**. Placeholder-only labels disappear on focus and fail users with memory or attention constraints — flag every occurrence.
- Mark required vs. optional explicitly (marking the *minority* category is cleaner).
- Field count: every field must justify itself. Flag fields collecting data with no evident purpose for the user's task (fax number, "how did you hear about us" as required).
- Input types must match content: `type="email"` for emails, `type="tel"` for phones, numeric keypads on mobile. Test on the mobile viewport — wrong keyboards are a mobile-conversion killer.
- Inline validation should fire on blur (leaving a field), not on every keystroke (premature errors while typing) and not only on submit.
- Error recovery: after a failed submit, all entered data persists, errors are listed, and each errored field is marked in place.
- Sensible defaults and autofill: country pre-selected by locale, `autocomplete` attributes present on name/email/address fields.
- Multi-column form layouts scan worse than single-column — flag only when the form is long or error-prone.

## Layout, hierarchy, and readability

- One clear primary action per screen. Identify what the page *wants* the user to do; check it's the most visually prominent element.
- Scanning support: meaningful headings, short paragraphs, bullets where users compare or scan. A heading should let users decide whether to read the section.
- Line length for body text: roughly 45–90 characters. Full-width paragraphs on wide screens hurt reading.
- Body text size ≥ 16px equivalent; check legal/footnote text isn't carrying important info at 11px.
- Whitespace and grouping: related controls grouped, unrelated separated (Gestalt proximity). Crowded control clusters cause mis-clicks.
- Content order matches user priority: key info (price, availability, next step) above the fold on the relevant pages.

## Responsiveness and mobile

Check at ~375px width, and note anything that breaks between widths.

- Horizontal scrolling on mobile = automatic High.
- Tap targets ≥ ~44×44px with breathing room; flag link lists or icon rows where adjacent targets nearly touch.
- Text remains readable without zooming; no fixed-width elements forcing tiny text.
- Mobile navigation: menu reachable, openable, closable; sticky headers shouldn't eat half the viewport.
- Hover-dependent functionality (menus, tooltips, reveal-on-hover buttons) must have a touch equivalent.
- Interstitials/popups on mobile: a full-screen popup on first mobile visit is a High-priority finding (also an SEO penalty).

## Perceived performance

You can't run a lab benchmark, but you can observe:

- Time to usable content on first load — note if you waited noticeably or saw long blank/spinner states.
- Layout shift: did content jump while loading (you went to click and things moved)?
- Images: oversized or unoptimized images visibly slow-loading; missing dimensions causing reflow.
- Note it honestly: a perceived-performance finding based on one load is Medium at best; frame it as "observed in this session, verify with field data".

## Trust and credibility (for commercial sites)

- Contact information and company identity findable within two clicks.
- Prices, fees, and shipping costs revealed early, not sprung at the last checkout step (a classic Critical: surprise costs at payment).
- Security cues at sensitive moments: payment forms on HTTPS, recognizable payment options.
- Stock photos vs. real product/team imagery — generic-everything erodes trust on conversion pages.
- Dead content: outdated copyright year, "latest news" from years ago, broken images. Cheap to find, disproportionately damaging to credibility.
