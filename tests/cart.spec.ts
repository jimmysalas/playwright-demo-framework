import { test, expect } from '../src/fixtures/base-test';

test.describe('Cart', () => {
  test('add single item to cart and verify badge count', async ({ authenticatedPage }) => {
    await authenticatedPage.addItemToCart('Sauce Labs Backpack');

    await expect(authenticatedPage.cartBadge).toHaveText('1');
  });

  test('add multiple items and verify cart contents', async ({ authenticatedPage, cartPage }) => {
    await authenticatedPage.addItemToCart('Sauce Labs Backpack');
    await authenticatedPage.addItemToCart('Sauce Labs Bike Light');
    await authenticatedPage.goToCart();

    const cartItemNames = await cartPage.getCartItemNames();
    expect(cartItemNames).toContain('Sauce Labs Backpack');
    expect(cartItemNames).toContain('Sauce Labs Bike Light');
    expect(cartItemNames).toHaveLength(2);
  });

  test('remove item from cart', async ({ authenticatedPage, cartPage }) => {
    await authenticatedPage.addItemToCart('Sauce Labs Backpack');
    await authenticatedPage.addItemToCart('Sauce Labs Bike Light');
    await authenticatedPage.goToCart();

    await cartPage.removeItem('Sauce Labs Backpack');

    const cartItemNames = await cartPage.getCartItemNames();
    expect(cartItemNames).not.toContain('Sauce Labs Backpack');
    expect(cartItemNames).toContain('Sauce Labs Bike Light');
  });
});
