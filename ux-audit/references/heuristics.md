# Nielsen's 10 Usability Heuristics — Web Audit Checklist

For each heuristic: what it means, and the concrete symptoms to look for on a real site. Cite the heuristic by name in the finding's `heuristic` field.

## 1. Visibility of system status

The system keeps users informed about what's happening through timely feedback.

Look for:
- Actions with no feedback: clicking "Add to cart" / "Save" / "Submit" and nothing visibly changes.
- No loading indicators on slow operations (search, page transitions, file uploads).
- Multi-step flows without a progress indicator (checkout, signup wizards).
- No confirmation after destructive or important actions (order placed, email sent, item deleted).
- Current location unclear: no active state in navigation, no breadcrumbs on deep pages.

## 2. Match between system and the real world

Speak the user's language; follow real-world conventions.

Look for:
- Internal jargon in the UI ("SKU pending allocation", "Tier-2 entitlement") where users expect plain words.
- Icons without labels whose meaning isn't universal (anything beyond search, cart, menu, close).
- Information ordered by the org chart rather than by user logic (e.g., products grouped by internal department).
- Dates, currencies, units in formats foreign to the audience.

## 3. User control and freedom

Users need a clearly marked emergency exit — undo, cancel, back.

Look for:
- No way to cancel an in-progress operation or multi-step flow without losing everything.
- Destructive actions with no undo AND no confirmation.
- Broken back-button behavior: browser Back loses form data, exits a modal flow entirely, or traps the user.
- Modals that can't be dismissed by ✕, Escape, or clicking outside.
- Forced account creation before users can see what they're getting (especially pre-checkout).

## 4. Consistency and standards

Same words, same actions, same look for the same things — and follow platform conventions.

Look for:
- The same action labeled differently across pages ("Sign in" vs "Log in" vs "Login").
- Inconsistent button styling: primary actions sometimes filled, sometimes outlined, sometimes links.
- Links that don't look like links; non-links styled like links.
- Logo not linking to homepage; cart/account icons not in the expected top-right region.
- Mixed interaction patterns: some lists open on click, others on hover.

## 5. Error prevention

Prevent problems before they happen; confirm before risky actions.

Look for:
- No inline validation — errors only revealed after full form submission.
- Inputs that accept obviously invalid data silently (letters in a phone field, past dates for a future booking).
- Easy-to-trigger destructive actions adjacent to common ones (Delete next to Edit, same styling).
- Ambiguous formats with no guidance (date fields without a format hint or picker).
- Double-submission possible: button not disabled after click on payment/submit.

## 6. Recognition rather than recall

Minimize memory load; make options, actions, and information visible.

Look for:
- Users must remember info from a previous step (a code, a price, an option name) to complete the current one.
- Search with no suggestions, no recent-searches, no spelling tolerance.
- Form re-entry: asking again for data the user already provided (shipping address re-typed at billing).
- Hidden critical actions: features only reachable via hover-only menus or unlabeled icons.

## 7. Flexibility and efficiency of use

Accelerators for experts; shortcuts for frequent tasks.

Look for:
- No autofill/autocomplete support on forms (missing `autocomplete` attributes counts).
- Frequent multi-step tasks with no shortcut (no "reorder", no saved addresses/payment, no bulk actions in lists).
- Search absent on content-heavy sites, or filters absent on long listings.

This heuristic is rarely Critical — usually Medium/Low unless the inefficiency is on a high-frequency core task.

## 8. Aesthetic and minimalist design

Every extra element competes with the relevant ones.

Look for:
- Competing calls-to-action: 3+ visually-primary buttons in one view, unclear what the *one* intended action is.
- Walls of text where users scan: paragraphs in place of headings/bullets on landing or instruction pages.
- Promotional noise (banners, popups, autoplay carousels) burying the core task. Note popup count and timing on first visit.
- Visual hierarchy inverted: the most important element is not the most prominent.

## 9. Help users recognize, diagnose, and recover from errors

Error messages in plain language that say what happened and how to fix it.

Look for (trigger errors deliberately to check):
- Error codes or raw technical messages shown to users ("Error 422", stack traces, "Something went wrong" with no recovery path).
- Errors that don't say *which field* is wrong or *what would be valid*.
- Error text far from the offending field, or only at the top of a long form.
- Form clearing all input on a failed submit — combined data-loss + error is a Critical candidate.
- 404 pages with no navigation, search, or way home.

## 10. Help and documentation

Help should be searchable, contextual, and task-focused.

Look for:
- No discoverable help/FAQ/contact path at all.
- Complex inputs with no contextual hint where one is needed (password requirements revealed only on error).
- Contact options buried or circular (help page links back to itself).

Weight this lens by context: critical for products with complex tasks, minor for simple marketing sites.
