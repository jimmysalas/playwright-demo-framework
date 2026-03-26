import { test, expect } from '../src/fixtures/base-test';

test.describe('Checkout', () => {
  test('complete checkout flow end to end', async ({ authenticatedPage, cartPage, checkoutPage, testData }) => {
    await authenticatedPage.addItemToCart('Sauce Labs Backpack');
    await authenticatedPage.goToCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.fillCheckoutInfo(testData.checkout);

    await expect(checkoutPage.summaryTotal).toBeVisible();
    await checkoutPage.finishButton.click();
    await expect(checkoutPage.completeHeader).toBeVisible();
  });

  test('checkout form validation with empty fields', async ({ authenticatedPage, cartPage, checkoutPage }) => {
    await authenticatedPage.addItemToCart('Sauce Labs Backpack');
    await authenticatedPage.goToCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.continueButton.click();

    await expect(checkoutPage.errorMessage).toContainText('First Name is required');
  });

  test('verify order confirmation page', async ({ authenticatedPage, cartPage, checkoutPage, testData }) => {
    await authenticatedPage.addItemToCart('Sauce Labs Onesie');
    await authenticatedPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCheckoutInfo(testData.checkout);
    await checkoutPage.finishButton.click();

    await expect(checkoutPage.completeHeader).toBeVisible();
    await expect(checkoutPage.backToProductsButton).toBeVisible();
  });
});
