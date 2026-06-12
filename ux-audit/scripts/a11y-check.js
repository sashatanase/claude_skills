/**
 * ux-audit accessibility scan — paste into the browser JS console / javascript_tool.
 * Returns a JSON summary of programmatically detectable WCAG issues.
 * Results are CANDIDATES: verify each before reporting (e.g., empty alt is
 * correct for decorative images; contrast math ignores backgrounds from images).
 */
(() => {
  const issues = [];
  const add = (check, wcag, items) => {
    if (items.length) issues.push({ check, wcag, count: items.length, examples: items.slice(0, 8) });
  };
  const describe = (el) => {
    const id = el.id ? `#${el.id}` : '';
    const cls = el.className && typeof el.className === 'string'
      ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : '';
    const text = (el.textContent || el.getAttribute('aria-label') || el.getAttribute('alt') || el.getAttribute('src') || '')
      .trim().slice(0, 60);
    return `<${el.tagName.toLowerCase()}${id}${cls}> "${text}"`;
  };
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none';
  };

  // 1.1.1 — images without alt attribute (missing entirely, not empty)
  add('Images missing alt attribute', '1.1.1',
    [...document.querySelectorAll('img:not([alt])')].filter(visible).map(describe));

  // 1.3.1 / 3.3.2 — inputs without an accessible label
  const unlabeled = [...document.querySelectorAll('input, select, textarea')]
    .filter(el => !['hidden', 'submit', 'button', 'image', 'reset'].includes(el.type))
    .filter(visible)
    .filter(el => {
      const byFor = el.id && document.querySelector(`label[for="${CSS.escape(el.id)}"]`);
      const wrapped = el.closest('label');
      const aria = el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') || el.getAttribute('title');
      return !byFor && !wrapped && !aria;
    });
  add('Form fields without a label', '1.3.1 / 3.3.2', unlabeled.map(describe));

  // Placeholder-only labeling (has placeholder, counted above too — flag separately)
  add('Fields using placeholder as only label', '3.3.2',
    unlabeled.filter(el => el.placeholder).map(el => `${describe(el)} placeholder="${el.placeholder}"`));

  // 1.3.1 — heading structure
  const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(visible);
  const hIssues = [];
  if (!document.querySelector('h1')) hIssues.push('No <h1> on page');
  if (document.querySelectorAll('h1').length > 1) hIssues.push(`${document.querySelectorAll('h1').length} <h1> elements`);
  let prev = 0;
  headings.forEach(h => {
    const lvl = +h.tagName[1];
    if (prev && lvl > prev + 1) hIssues.push(`Skip h${prev}→h${lvl} at "${h.textContent.trim().slice(0, 40)}"`);
    prev = lvl;
  });
  add('Heading structure problems', '1.3.1', hIssues);

  // 1.4.3 — contrast on visible text nodes (solid backgrounds only).
  // Colors are normalized by painting a canvas pixel and reading it back:
  // modern Chrome returns computed colors as lab()/oklch(), which naive
  // regex parsing silently turns into garbage ratios.
  const cv = document.createElement('canvas'); cv.width = cv.height = 1;
  const cctx = cv.getContext('2d', { willReadFrequently: true });
  const parse = (c) => {
    cctx.clearRect(0, 0, 1, 1); cctx.fillStyle = c; cctx.fillRect(0, 0, 1, 1);
    const d = cctx.getImageData(0, 0, 1, 1).data;
    return [d[0], d[1], d[2], d[3] / 255];
  };
  const lum = ([r, g, b]) => {
    const f = v => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const bgOf = (el) => {
    for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
      const s = getComputedStyle(n);
      if (s.backgroundImage !== 'none') return null; // can't compute — skip
      const c = parse(s.backgroundColor);
      if (c[3] > 0.9) return c;
    }
    return [255, 255, 255, 1];
  };
  const lowContrast = [];
  const seen = new Set();
  [...document.querySelectorAll('body *')].filter(visible).forEach(el => {
    if (![...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 2)) return;
    const s = getComputedStyle(el);
    const fg = parse(s.color); const bg = bgOf(el);
    if (!fg || !bg) return;
    const [l1, l2] = [lum(fg), lum(bg)].sort((a, b) => b - a);
    const ratio = (l1 + 0.05) / (l2 + 0.05);
    const size = parseFloat(s.fontSize);
    const large = size >= 24 || (size >= 18.66 && +s.fontWeight >= 700);
    const min = large ? 3 : 4.5;
    if (ratio < min) {
      const key = `${s.color}|${s.fontSize}`;
      if (!seen.has(key)) {
        seen.add(key);
        lowContrast.push(`${describe(el)} ratio ${ratio.toFixed(2)}:1 (needs ${min}:1, ${size}px)`);
      }
    }
  });
  add('Low text contrast (solid backgrounds only)', '1.4.3', lowContrast);

  // 1.3.1 — landmarks
  const lm = [];
  if (!document.querySelector('main, [role="main"]')) lm.push('No <main> landmark');
  if (!document.querySelector('nav, [role="navigation"]')) lm.push('No <nav> landmark');
  add('Missing landmarks', '1.3.1', lm);

  // 2.4.4 — vague link text
  add('Vague link text', '2.4.4',
    [...document.querySelectorAll('a')].filter(visible)
      .filter(a => /^(click here|here|read more|more|learn more|link|details)\.?$/i.test((a.textContent || '').trim()))
      .filter(a => !a.getAttribute('aria-label'))
      .map(a => `"${a.textContent.trim()}" → ${a.getAttribute('href')}`));

  // 3.1.1 — lang
  if (!document.documentElement.lang) add('Missing lang attribute on <html>', '3.1.1', ['<html> has no lang']);

  // 2.5.8 — tap target size
  add('Tap targets under 24x24px', '2.5.8',
    [...document.querySelectorAll('a, button, input[type="checkbox"], input[type="radio"]')]
      .filter(visible)
      .filter(el => { const r = el.getBoundingClientRect(); return r.width < 24 || r.height < 24; })
      .map(el => { const r = el.getBoundingClientRect(); return `${describe(el)} ${Math.round(r.width)}x${Math.round(r.height)}px`; }));

  // 4.1.2 — clickable divs/spans
  add('Clickable div/span (not real buttons/links)', '4.1.2',
    [...document.querySelectorAll('div[onclick], span[onclick], div[role="button"]:not([tabindex]), span[role="button"]:not([tabindex])')]
      .filter(visible).map(describe));

  // 2.4.3 — positive tabindex
  add('Positive tabindex values', '2.4.3',
    [...document.querySelectorAll('[tabindex]')].filter(el => +el.getAttribute('tabindex') > 0).map(describe));

  // 1.4.2 — autoplay media
  add('Autoplaying media', '1.4.2',
    [...document.querySelectorAll('video[autoplay], audio[autoplay]')].map(describe));

  return JSON.stringify({
    url: location.href,
    title: document.title,
    totalIssueTypes: issues.length,
    issues
  }, null, 2);
})();
