import type { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class CartPage extends BasePage {
  readonly path = '/cart.html';

  readonly title: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = this.page.getByText('Your Cart', { exact: true });
    this.cartItems = this.page.locator('[data-test="inventory-item"]');
    this.checkoutButton = this.page.locator('[data-test="checkout"]');
    this.continueShoppingButton = this.page.locator('[data-test="continue-shopping"]');
  }

  async getCartItemNames(): Promise<string[]> {
    return this.page.locator('[data-test="inventory-item-name"]').allTextContents();
  }

  async removeItem(itemName: string): Promise<void> {
    const item = this.cartItems.filter({ hasText: itemName });
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
