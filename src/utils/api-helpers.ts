import type { APIRequestContext } from '@playwright/test';

/**
 * API-first setup helpers.
 *
 * Sauce Demo doesn't expose a public API, so these helpers demonstrate
 * the pattern of using API calls for test setup instead of UI interactions.
 * In a real application, this would replace slow UI-based setup with fast
 * API calls for creating test data and authenticating users.
 */

interface ApiSetupOptions {
  request: APIRequestContext;
  baseURL: string;
}

/**
 * Demonstrates API-based authentication pattern.
 * In production apps, this replaces UI login with a direct API call
 * to get session tokens, dramatically speeding up test setup.
 */
export const authenticateViaApi = async ({ request, baseURL }: ApiSetupOptions) => {
  // Pattern: POST to auth endpoint, extract session token, set as cookie
  //
  // const response = await request.post(`${baseURL}/api/auth/login`, {
  //   data: { username: 'standard_user', password: 'secret_sauce' },
  // });
  // const { token } = await response.json();
  // return token;

  // Sauce Demo uses cookie-based auth via form POST
  const response = await request.post(`${baseURL}/`, {
    form: {
      'user-name': 'standard_user',
      password: 'secret_sauce',
    },
  });

  return response.status();
};

/**
 * Demonstrates API-based test data creation pattern.
 * In production apps, test data is created via API before UI tests run,
 * following the "API-first setup" principle for speed and reliability.
 */
export const createTestProduct = async ({ request, baseURL }: ApiSetupOptions) => {
  // Pattern: Create resources via API, return IDs for UI assertions
  //
  // const response = await request.post(`${baseURL}/api/products`, {
  //   data: {
  //     name: faker.commerce.productName(),
  //     price: faker.commerce.price(),
  //     description: faker.commerce.productDescription(),
  //   },
  // });
  // return response.json();

  void request;
  void baseURL;
  return { id: 1, name: 'Sample Product', price: '$9.99' };
};
