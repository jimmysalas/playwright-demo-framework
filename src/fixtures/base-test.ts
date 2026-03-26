import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { InventoryPage } from '../pages/inventory-page';
import { CartPage } from '../pages/cart-page';
import { CheckoutPage } from '../pages/checkout-page';
import { generateCheckoutInfo } from './test-data';
import { USERS } from '../types';
import type { CheckoutInfo } from '../types';

type TestFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  authenticatedPage: InventoryPage;
  testData: { checkout: CheckoutInfo };
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    const inventoryPage = new InventoryPage(page);
    await expect(inventoryPage.title).toBeVisible();
    await use(inventoryPage);
  },

  testData: async ({}, use) => {
    await use({
      checkout: generateCheckoutInfo(),
    });
  },
});

export { expect };
