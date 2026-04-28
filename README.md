# ncontracts-coding

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/CI-GitHub_Actions-2088FF?logo=githubactions&logoColor=white)

A focused Playwright TodoMVC automation project using TypeScript and a single Chrome target.

## Tech Stack

- **Playwright** - E2E testing
- **TypeScript** - Type-safe test code
- **GitHub Actions** - CI/CD pipeline
- **ESLint + Prettier** - Code quality and formatting

## Architecture

```
src/
└── pages/
    └── todo-page.ts

tests/
└── todo.spec.ts        # TodoMVC scenarios
```

## Design Patterns

### Page Object Model
The TodoMVC page is modeled as a dedicated page object with locators as `readonly` properties and methods for reusable UI actions.

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/jimmysalas/ncontracts-coding.git
cd ncontracts-coding
npm install
npx playwright install
```

### Running Tests

```bash
# Run all tests
npm test

# Run in headed mode (visible browser)
npm run test:headed

# Run with Playwright Inspector
npm run test:debug

# Run Chrome explicitly
npm run test:chrome

# Run against a specific Todo environment
BASE_URL="https://demo.playwright.dev/todomvc/#/" npx playwright test tests/todo.spec.ts

# View HTML report
npm run report
```

## CI/CD

Tests run automatically on every push and pull request via GitHub Actions. The workflow:
1. Installs dependencies and browsers
2. Runs the Todo test suite in Chrome
3. Uploads HTML report as an artifact

## Test Coverage

| Area | Tests | Coverage |
|------|-------|----------|
| TodoMVC | 5 | Add, complete, delete, filter, empty-submit guard |

## Author

**James Salas** - [GitHub](https://github.com/jimmysalas)
