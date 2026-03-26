# Playwright Demo Framework

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/CI-GitHub_Actions-2088FF?logo=githubactions&logoColor=white)

A professional Playwright test automation framework demonstrating industry best practices: Page Object Model, custom fixtures, API-first setup patterns, and cross-browser testing.

## Tech Stack

- **Playwright** - Cross-browser E2E testing
- **TypeScript** - Type-safe test code
- **Faker.js** - Dynamic test data generation
- **GitHub Actions** - CI/CD pipeline
- **ESLint + Prettier** - Code quality and formatting

## Architecture

```
src/
├── pages/          # Page Object Model
│   ├── base-page.ts
│   ├── login-page.ts
│   ├── inventory-page.ts
│   ├── cart-page.ts
│   └── checkout-page.ts
├── fixtures/       # Custom test fixtures
│   ├── base-test.ts
│   └── test-data.ts
├── utils/          # API helpers
│   └── api-helpers.ts
└── types/          # TypeScript interfaces
    └── index.ts

tests/
├── login.spec.ts       # Authentication tests
├── inventory.spec.ts   # Product listing and sorting
├── cart.spec.ts        # Shopping cart operations
└── checkout.spec.ts    # End-to-end checkout flow
```

## Design Patterns

### Page Object Model
Each page is a class with locators as `readonly` properties and methods only for multi-step UI actions. Tests never reference raw selectors.

### Custom Fixtures
Extended Playwright fixtures provide pre-configured page objects and an `authenticatedPage` fixture that handles login automatically before each test.

### API-First Setup
Test data creation and authentication via API calls rather than UI interactions, reducing test execution time and flakiness.

### Test Data Generation
Faker.js generates unique test data per run, ensuring test isolation and avoiding data collisions during parallel execution.

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/jimmysalas/playwright-demo-framework.git
cd playwright-demo-framework
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

# Run specific browser
npm run test:chrome
npm run test:firefox
npm run test:mobile

# View HTML report
npm run report
```

## CI/CD

Tests run automatically on every push and pull request via GitHub Actions. The workflow:
1. Installs dependencies and browsers
2. Runs tests across Chrome, Firefox, and Mobile Safari
3. Uploads HTML report as an artifact

## Test Coverage

| Area | Tests | Coverage |
|------|-------|----------|
| Login | 3 | Valid login, locked user, invalid credentials |
| Inventory | 3 | Product display, price sort, name sort |
| Cart | 3 | Add item, multiple items, remove item |
| Checkout | 3 | Full flow, form validation, order confirmation |

## Author

**James Salas** - [GitHub](https://github.com/jimmysalas)
