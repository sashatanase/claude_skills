# UX Writing — Audit Checklist

Words are interface. Audit the copy users hit while doing tasks — buttons, labels, errors, empty states, confirmations — with more weight than marketing prose. Use principle names like "Clarity", "Error message quality", "CTA specificity" in the finding's `heuristic` field.

For writing findings, the recommendation should usually **include the rewritten copy**. "Make this clearer" is not a finding; "Change 'Submission processed unsuccessfully' to 'We couldn't save your changes — check the fields marked in red'" is.

## Clarity

- Would a first-time user understand every word on the primary path? Flag jargon, internal product names used before they're explained, and abbreviations without expansion.
- Front-load sentences and labels: the distinguishing word first. "Pricing for teams" scans; "Information about our team pricing options" doesn't.
- One idea per sentence in UI copy. Flag instructions that bundle three steps into one paragraph.
- Ambiguity test: can a label be read two ways? ("Back" — to where? "Submit" — what happens?)

## CTAs and buttons

- Buttons should say what they *do*, in verb form: "Create account", "Download report", "Place order" — not "Submit", "OK", "Continue" where the consequence matters.
- The label must match the consequence: a button saying "Sign up free" that leads to a credit-card form is a trust violation (flag as High).
- Paired actions must be unambiguous: "Cancel" next to "Cancel order" is a classic trap — which cancels what?
- Consistent terminology with the rest of the UI: if the nav says "Projects", the button shouldn't say "Create workspace".

## Error messages

The highest-stakes copy in any product. For each error you triggered during the audit, score it against all three:

1. **What happened** — in plain language, no codes ("That email is already registered", not "Validation error 409").
2. **Why / what's wrong** — specific to the input ("Passwords need at least 8 characters", not "Invalid password").
3. **How to fix it** — the next action, ideally with a path ("Try signing in instead — or reset your password").

Also flag: blaming tone ("You entered an invalid…"), ALL-CAPS or exclamation marks in errors, humor in failure states where users are stressed, and the generic "Something went wrong" with no recovery path.

## Empty states, confirmations, and feedback

- Empty states should orient and activate: what is this space, and what's the first step? A blank table or "No data" is a missed onboarding moment (Medium).
- Confirmations should confirm specifics: "Order #1043 placed — arriving Thursday" beats "Success!".
- Destructive-action confirmations must state the object and the consequence: "Delete 'Q3 Report'? This can't be undone." — not "Are you sure?".

## Tone and consistency

- Is the tone consistent across the journey? A playful marketing page feeding into a bureaucratic form is a seam users feel.
- Tone must match the moment: light in success, plain and calm in errors and payments. Flag jokes near money, deletion, or failures.
- Capitalization and terminology consistency: pick sentence case or title case for buttons/headings and stick to it; one name per concept across the product ("cart" vs "basket" vs "bag").
- Reading level: aim for plain language (roughly grade 7–9) in instructional copy. Flag legalese leaking into UI.

## Microcopy details worth flagging

- Placeholder text used as instructions (disappears on focus — also an accessibility issue; cross-reference, report once).
- Form hints that appear only *after* an error when they could prevent it (password rules, date formats).
- Numbers and dates: ambiguous formats ("03/04/2025"), missing units, prices without currency.
- Title/label truncation ("Continue to payme…") at the audited viewport widths.
- Localization seams if the site is multilingual: mixed languages on one page, machine-translation artifacts.
