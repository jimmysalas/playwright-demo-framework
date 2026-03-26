import type { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class InventoryPage extends BasePage {
  readonly path = '/inventory.html';

  readonly title: Locator;
  readonly inventoryItems: Locator;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.title = this.page.getByText('Products', { exact: true });
    this.inventoryItems = this.page.locator('[data-test="inventory-item"]');
    this.sortDropdown = this.page.locator('[data-test="product-sort-container"]');
    this.cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = this.page.locator('[data-test="shopping-cart-link"]');
  }

  async addItemToCart(itemName: string): Promise<void> {
    const item = this.inventoryItems.filter({ hasText: itemName });
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeItemFromCart(itemName: string): Promise<void> {
    const item = this.inventoryItems.filter({ hasText: itemName });
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async getItemNames(): Promise<string[]> {
    return this.page.locator('[data-test="inventory-item-name"]').allTextContents();
  }

  async getItemPrices(): Promise<number[]> {
    const priceTexts = await this.page.locator('[data-test="inventory-item-price"]').allTextContents();
    return priceTexts.map((text) => parseFloat(text.replace('$', '')));
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }
}
