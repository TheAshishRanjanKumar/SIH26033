# AGRIDIRECT — SESSION 1

You are working on the AgriDirect frontend for SIH26033.

Execute SESSION 1 from /docs/PHASES.md.

Before modifying code, read completely:
- /docs/FRONTEND_SPEC.md
- /docs/PHASES.md
- /docs/ACCEPTANCE.md
- /docs/FRONTEND_AUDIT.md

Act as:
- Lead frontend engineer
- Product designer
- UX engineer
- Responsive UI engineer
- Frontend QA engineer

You are improving an existing repository. Do not assume the repository matches documentation.

# FIRST ACTION — AUDIT

Inspect the actual repository before significant modification:
- package.json
- routes
- components
- layouts
- state
- mock data
- API wrappers
- charts
- styling
- images
- tests
- configuration

Update /docs/FRONTEND_AUDIT.md with actual findings.
Do not fabricate audit information.

# SESSION 1 SCOPE

Implement:
1. Foundation
2. Design system
3. Shared application shell
4. Farmer home
5. Farmer listing
6. Marketplace
7. Economic value
8. Session 1 golden-path integration

# CORE RULES

Frontend only.
Do not redesign backend.
Do not introduce unnecessary infrastructure.
Do not replace working architecture without reason.
Reuse existing components, routes, state, mock data, utilities, and services where practical.
Do not destroy working functionality.

# FARMER UX

Farmer UX must be:
- simple
- visual
- mobile-first
- low-literacy friendly
- localization-ready

Prioritize:
- crop
- price
- expected price
- market signal
- AI recommendation
- primary action

AI must be visible directly on the farmer experience.

# MARKETPLACE

Price must have strong visual hierarchy.
Use crop-specific imagery:
- Tomato
- Onion
- Potato
- Green Chilli
- Cabbage

Do not use the same generic leaf icon for every crop.

# STATE

Preserve existing state architecture.

Verify:
Farmer creates listing → listing persists → buyer marketplace → listing visible

Do not fake this with disconnected duplicate data.

# ECONOMIC VALUE

Where supported show:
- farmer realization
- reference/mandi price
- buyer price
- buyer savings

Do not make unsupported real-world claims.

# DESIGN

Use FRONTEND_SPEC.md as design authority.
Do not make the product look like a generic SaaS admin template.

# RESPONSIVE

Build intentionally for:
320px, 375px, 390px, 430px, 768px, 1024px, 1280px, 1440px, 1920px

# VERIFICATION

Run available:
- lint
- typecheck
- tests
- build

If browser/screenshot tooling is available, verify important flows.
If unavailable, mark visual requirements UNVERIFIED.
Never claim browser verification without actually performing it.

# ACCEPTANCE

Update /docs/ACCEPTANCE.md.
Every PASS requires evidence.
Use PASS / UNVERIFIED / BLOCKED / FAIL.
Never convert UNVERIFIED to PASS without evidence.

# CHECKPOINT

At the end:
1. Review changed files.
2. Run verification commands.
3. Update FRONTEND_AUDIT.md.
4. Update ACCEPTANCE.md.
5. Update PHASES.md.
6. Report changed, verified, unverified, blocked, failed, commands, remaining issues.

Do not begin Session 2.
Stop after Session 1 is complete and documented.
