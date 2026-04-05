# Fix Cursor Hover Effect (Magnetic Bloom)

**Overview:** The "Magnetic Bloom" custom cursor and particle effects are currently not working. This is because the DOM elements (cursor dot, follower, flower, and particles) are not present in `index.html`, and their styling is missing from the CSS. 
**Project Type:** WEB

## Success Criteria
- Magnetic Bloom custom cursor follows the mouse.
- Particle trails (sparkle and petal) spawn on mouse movement and click.
- Hover targets correctly trigger the `.cursor-flower` expansion (Magnetic Bloom visual).
- No JS errors from missing elements.
- Web Vitals / performance unaffected by JS animations.

## Tech Stack
- Frontend: HTML/CSS
- JS: Vanilla + GSAP (already included in the repo)

## File Structure
- `index.html` → Will add the required `div` elements for the cursor.
- `css/animations.css` & `css/base.css` → Will add styling for `.cursor-flower`, `.petal-particle`, `.sparkle-particle`.
- `js/main.js` → (Verify, already has correct logic).

## Task Breakdown

### Task 1: Add Cursor HTML Elements
- **Name**: Inject DOM Nodes in Layout
- **Agent**: `frontend-specialist`
- **Skills**: `frontend-design`
- **Priority**: P1
- **Dependencies**: None
- **INPUT**: `index.html`
- **OUTPUT**: Add `<div class="cursor-dot"></div>`, `<div class="cursor-follower"></div>`, `<div class="cursor-flower"></div>`.
- **VERIFY**: Check elements exist in DOM.

### Task 2: Add CSS Styling for Particles and Flower
- **Name**: Styling Cursor Particles
- **Agent**: `frontend-specialist`
- **Skills**: `animations` / `css`
- **Priority**: P1
- **Dependencies**: Task 1
- **INPUT**: `css/animations.css` or `css/base.css`
- **OUTPUT**: Add CSS classes for `.cursor-flower`, `.petal-particle`, `.sparkle-particle`. Ensure they have the correct `.cursor-follower` base defaults.
- **VERIFY**: Elements render properly without disrupting layout.

### Task 3: Verify and Test GSAP Hooks
- **Name**: Validate Event Listeners
- **Agent**: `frontend-specialist`
- **Skills**: `testing-patterns`
- **Priority**: P2
- **Dependencies**: Task 2
- **INPUT**: Browser
- **OUTPUT**: Complete cursor feature.
- **VERIFY**: Move mouse, click, and hover elements to see visual changes.

## Phase X: Verification (Final Check)
- [ ] Accessibility: Check cursor doesn't interfere with pointer-events (use `pointer-events: none`).
- [ ] CSS Lint (npm run lint styles).
- [ ] Run Lighthouse or run `python .agent/skills/performance-profiling/scripts/lighthouse_audit.py http://localhost:3000` to confirm we aren't hurting performance.

---
## ✅ PHASE X COMPLETE
_Pending execution_
