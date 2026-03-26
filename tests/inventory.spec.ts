import { test, expect } from '../src/fixtures/base-test';

test.describe('Inventory', () => {
  test('products are displayed on inventory page', async ({ authenticatedPage }) => {
    await expect(authenticatedPage.title).toBeVisible();

    const itemCount = await authenticatedPage.inventoryItems.count();
    expect(itemCount).toBeGreaterThan(0);
  });

  test('sort products by price low to high', async ({ authenticatedPage }) => {
    await authenticatedPage.sortBy('lohi');

    const prices = await authenticatedPage.getItemPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('sort products by name Z to A', async ({ authenticatedPage }) => {
    await authenticatedPage.sortBy('za');

    const names = await authenticatedPage.getItemNames();
    const sorted = [...names].sort((a, b) => b.localeCompare(a));
    expect(names).toEqual(sorted);
  });
});
