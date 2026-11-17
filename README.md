# cypress-e2e-suite

A Cypress 13 test suite for [DemoQA Book Store](https://demoqa.com/books) demonstrating UI regression testing and REST API testing in a single project.

![CI](https://github.com/tresajohn/cypress-e2e-suite/actions/workflows/cypress.yml/badge.svg)

**[View Allure Test Report](https://tresajohn.github.io/cypress-e2e-suite)**

---

## What this tests

### UI (9 tests)

| Spec | Coverage |
|---|---|
| `auth.cy.js` | Valid login via session, invalid credentials error, logout |
| `books.cy.js` | Book store list, navigate to book detail, add book to collection |
| `profile.cy.js` | Username display, Go To Book Store button, navigation |

### API (10 tests)

| Spec | Coverage |
|---|---|
| `auth-api.cy.js` | POST /GenerateToken — 200 valid, failed invalid, response schema |
| `user-api.cy.js` | GET /User/:uuid — 200 authenticated, 401 no token, response schema |
| `books-api.cy.js` | GET /Books — list, schema; POST /Books — add to collection; verify in profile |

---

## Local setup

```bash
git clone https://github.com/tresajohn/cypress-e2e-suite.git
cd cypress-e2e-suite
npm install
```

Create `cypress.env.json` in the project root (gitignored — never commit):

```json
{
  "DEMOQA_USERNAME": "your-demoqa-username",
  "DEMOQA_PASSWORD": "your-demoqa-password"
}
```

Register a free account at [demoqa.com/register](https://demoqa.com/register) if you don't have one.

```bash
# Open interactive mode
npm run cy:open

# Run headless
npm test

# View Allure report locally after a run
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

---

## CI

GitHub Actions runs the full suite on every push to `main`. The Allure report is published to GitHub Pages automatically.

**Required GitHub repository secrets:**

| Secret | Value |
|---|---|
| `DEMOQA_USERNAME` | Your DemoQA test account username |
| `DEMOQA_PASSWORD` | Your DemoQA test account password |

Add these at: **Settings → Secrets and variables → Actions → New repository secret**

Enable GitHub Pages at: **Settings → Pages → Source: Deploy from a branch → Branch: `gh-pages`**
