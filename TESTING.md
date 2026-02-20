# Running Cypress E2E tests

1. Install dependencies:

```bash
npm install
```

2. Start the dev server (Vite):

```bash
npm run dev
```

3. Open Cypress Test Runner (interactive):

```bash
npm run cy:open
```

4. Run Cypress headless:

```bash
npm run cy:run
```

Notes:
- The Cypress `baseUrl` is set to `http://localhost:5173` in `cypress.config.ts`.
- The sample test visits `/login` and verifies navigation to `/signup` without requiring backend authentication.
