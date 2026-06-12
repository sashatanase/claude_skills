---
name: ux-audit
description: >-
  Perform a structured UX audit of a website or web application by exploring it
  in a browser and evaluating it against UX heuristics, usability principles,
  accessibility (WCAG), and UX writing quality. Produces an interactive HTML
  report with prioritized findings (Critical/High/Medium/Low) and concrete
  recommendations. Use this skill whenever the user asks for a UX audit, UX
  review, usability review, heuristic evaluation, accessibility check or audit,
  design critique of a live site, "what's wrong with my website", "how can I
  improve my site's UX", or asks to evaluate the user experience, navigation,
  forms, or copy of any website or web app — even if they don't use the word
  "audit".
---

# UX Audit

Audit a live website or web app and deliver an interactive HTML report with prioritized findings and recommendations.

A good audit is built on **evidence, not vibes**. Every finding must point to something you actually observed — a screenshot, a quote of the on-screen text, a result from the accessibility script. Generic advice that could apply to any website ("improve your visual hierarchy") is worthless to the user; specific, located, actionable findings ("the primary CTA on /pricing is light-gray text on white, contrast ratio 2.1:1 — make it the brand blue used in the header") are the entire value of this skill.

## Step 1: Scope the audit

Confirm with the user (or infer from their message):

- **URL** of the site or app. If they gave a running local app, that works too.
- **Key user flows** to focus on. If not specified, audit the homepage plus the 2–4 most important flows you can discover: primary navigation, the main call-to-action path, search if present, and one form (signup, contact, checkout).
- **Audience/context** if relevant (e.g., e-commerce vs. internal tool changes what matters).

Don't block on this — if the user only gave a URL, state your assumed scope in one sentence and proceed.

## Step 2: Explore and capture evidence

Pick the best available browser tool:

1. **Chrome MCP** (`mcp__Claude_in_Chrome__*`) — preferred for public URLs. Navigate, read pages, take screenshots, run JavaScript.
2. **Preview tools** (`mcp__Claude_Preview__*`) — for local apps in this project.
3. **WebFetch fallback** — if no browser is available, fetch the HTML and audit markup, content, and UX writing only. Tell the user the audit is static-only (no visual, interaction, or contrast findings) and mark the report accordingly.

Explore systematically, and take a screenshot at each meaningful state — these are your evidence:

- **Homepage, desktop width** (~1440px): first impressions, hierarchy, navigation clarity.
- **Mobile width** (~375px): resize and re-check the homepage and one key flow. Responsive failures are among the most common high-priority findings.
- **Each key flow**: actually walk it. Click the primary CTA. Open the menu. Type into the search box.
- **Forms**: submit one empty/invalid to capture real error states. Error handling is where most products fail hardest and it's invisible until you trigger it.
- **Edge states** when cheap to reach: empty search results, a 404 (visit a junk path).

Run the bundled accessibility script on each major page: paste the contents of [scripts/a11y-check.js](scripts/a11y-check.js) into the browser's JavaScript tool. It returns a JSON summary of programmatically detectable issues (missing alt text, unlabeled inputs, heading-order violations, low-contrast text, missing landmarks, vague link text, small tap targets). These are *candidates* — verify each before reporting it, because automated checks have false positives (e.g., decorative images legitimately have empty alt).

Keep notes as you go: page, what you saw, screenshot filename. Save screenshots to a `ux-audit-<site>/screenshots/` folder next to where the report will go (if your browser tool can't save screenshots to disk, note that and rely on quoted/measured evidence instead).

**Save the evidence to disk as you collect it** — the lens subagents in Step 3 can't see your browser session, only files. Create `ux-audit-<site>/evidence/` containing:

- `observations.md` — your running notes: per page, what you saw, what you clicked, what happened (especially form error states, mobile behavior, anything broken or confusing). Be specific: quote on-screen text, record measurements. This is the subagents' primary source — a thin observations file means thin findings.
- `page-<name>.txt` — the extracted text content of each audited page.
- `a11y-<name>.json` — the a11y-check.js output for each audited page.
- `scope.md` — the URL, pages covered, viewports tested, and anything you couldn't test (so subagents don't invent findings about things nobody observed).

## Step 3: Evaluate the four lenses with parallel subagents

Each lens has a reference file with its checklist and common failure patterns:

| Lens | Reference | What it covers |
|---|---|---|
| UX heuristics | [references/heuristics.md](references/heuristics.md) | Nielsen's 10 heuristics with web-specific symptoms |
| Usability principles | [references/usability.md](references/usability.md) | Navigation, forms, layout, responsiveness, performance perception |
| Accessibility | [references/accessibility.md](references/accessibility.md) | WCAG 2.2 AA checklist organized by what you can actually verify |
| UX writing | [references/ux-writing.md](references/ux-writing.md) | Clarity, tone, microcopy, error messages, CTAs, labels |

If the Agent tool is available, spawn **four subagents in the same turn** — one per lens — so they run in parallel. Each gets the prompt template from [references/lens-agent-prompt.md](references/lens-agent-prompt.md) with the lens name, its reference file path, and the evidence folder path filled in. Each subagent reads only files (never the browser — the browser session is yours alone) and writes its findings to `evidence/findings-<lens>.json`.

While the subagents run, do the verification work that needs the live browser: re-check anything from your notes you weren't sure about, and visit any page you skipped.

If subagents aren't available or get denied, evaluate the lenses yourself inline — read each reference file in turn against your evidence. The output contract is identical either way.

### Merging the four lens outputs

You are the editor, not a stapler. When the subagents return:

- **Dedupe across lenses.** The same observation often surfaces twice (a placeholder-only label is both an accessibility and a writing finding). Keep one finding under the most impactful lens, mention the other angle in its impact text.
- **Re-calibrate priorities globally.** Each subagent rated severity seeing only its own lens; you've seen everything. A "Critical" writing nitpick next to a real keyboard trap needs demoting. Apply the Step 4 definitions across the merged set.
- **Cut anything not grounded in the evidence files.** Subagents occasionally extrapolate beyond what was observed; if a finding cites evidence you can't trace to `observations.md`, a page text file, or an a11y scan, verify it in the browser or drop it.
- **Renumber** findings F-01, F-02, … in final priority order.

## Step 4: Prioritize

Rate each finding on two axes — **impact** (does it block or significantly hinder a task? does it cause errors, lost data, or exclusion of users with disabilities?) and **reach** (does it affect everyone, or a narrow path/edge case?). Then assign:

- **Critical** — blocks a core task or excludes a user group entirely. Broken checkout, form that can't be submitted, content unreachable by keyboard, contrast so low text is unreadable. *Fix immediately.*
- **High** — significantly hinders a core task or affects most users. Confusing navigation on a primary flow, error messages that don't say what went wrong, key page broken on mobile. *Fix in the next cycle.*
- **Medium** — causes friction, slows users, or affects secondary flows. Inconsistent button styles, unclear labels users recover from, missing feedback after an action. *Plan it.*
- **Low** — polish. Minor copy issues, slight inconsistencies, opportunities rather than problems. *Nice to have.*

Be honest with the scale. A report where everything is Critical is as useless as one where everything is Low. Most real audits cluster in High/Medium with a handful of Criticals — if you have more than ~5 Criticals, re-check your calibration against the definitions above.

For each finding, also estimate **effort** (Low/Medium/High) so the report can surface quick wins.

## Step 5: Generate the report

Use the template at [assets/report-template.html](assets/report-template.html). Copy it, then replace the placeholders. If you script the merge, read and write the files explicitly as UTF-8 (PowerShell 5.1 in particular mis-decodes BOM-less UTF-8 by default and will corrupt any non-ASCII characters in findings or evidence quotes).

- `__SITE_NAME__`, `__SITE_URL__`, `__AUDIT_DATE__`, `__AUDIT_SCOPE__` — basics.
- `__EXEC_SUMMARY__` — 3–5 sentences of HTML: overall impression, the biggest risks, the biggest quick wins. Write it for a stakeholder who reads nothing else.
- `__SCORES_JSON__` — per-lens score object, e.g. `{"heuristics": 7, "usability": 6, "accessibility": 4, "writing": 8}`. Score 1–10 where 10 = no meaningful issues found. Derive from finding count and severity in that lens.
- `__FINDINGS_JSON__` — array of finding objects:

```json
{
  "id": "F-01",
  "title": "Short, specific problem statement",
  "category": "heuristics | usability | accessibility | writing",
  "priority": "critical | high | medium | low",
  "effort": "low | medium | high",
  "location": "Page or flow where observed, e.g. '/checkout, step 2'",
  "heuristic": "The principle violated, e.g. 'Visibility of system status' or 'WCAG 1.4.3 Contrast'",
  "evidence": "What you actually observed — quote the text, cite the measurement, name the screenshot file",
  "impact": "Who is affected and what it costs them",
  "recommendation": "Specific fix. Name the element, propose the new copy, give the target value. Not 'improve contrast' but 'darken the label to #595959 or darker to reach 4.5:1'.",
  "screenshot": "screenshots/checkout-step2-error.png"
}
```

The `screenshot` field is optional; when present, the report renders the image inline with the finding, so use paths relative to the report file.

Order findings by priority (Critical first), then by effort (low effort first within a priority) — this puts quick wins where decision-makers see them. Save the report as `ux-audit-<site>/ux-audit-report.html` and tell the user the path. Open it in the browser if a browser tool is available.

A typical thorough audit yields **12–25 findings**. Fewer than 8 suggests you didn't dig into flows, forms, mobile, and error states; more than 30 means you're listing nitpicks individually — merge related ones (e.g., one finding for "form inputs lack labels" listing all affected fields, not five findings).
