# Claude Skills

A collection of custom skills for [Claude Code](https://claude.com/claude-code) and the Claude desktop app.

## Skills

### ux-audit

Performs a structured UX audit of a website or web application by exploring it live in a browser, then produces an interactive HTML report with prioritized findings and concrete recommendations.

**What it evaluates:**
- **UX heuristics** — Nielsen's 10 heuristics with web-specific symptoms
- **Usability principles** — navigation, forms, layout, mobile responsiveness, trust
- **Accessibility** — WCAG 2.2 AA checklist plus a bundled automated scanner (`scripts/a11y-check.js`)
- **UX writing** — clarity, CTAs, error messages, tone, microcopy

**Output:** an interactive HTML report with executive summary, per-lens scores, and findings prioritized Critical / High / Medium / Low, each with evidence, impact, effort estimate, and a specific recommendation.

## Installation

Copy a skill folder into your Claude Code skills directory:

```powershell
# Windows — available in all projects
Copy-Item .\ux-audit "$env:USERPROFILE\.claude\skills\ux-audit" -Recurse
```

```bash
# macOS / Linux — available in all projects
cp -r ./ux-audit ~/.claude/skills/ux-audit
```

Or place it in a project's `.claude/skills/` folder to scope it to that project.

## Usage

In Claude Code, just ask naturally:

> Do a UX audit of https://example.com

or invoke it explicitly:

> /ux-audit https://example.com
