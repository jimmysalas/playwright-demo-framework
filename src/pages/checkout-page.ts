import type { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';
import type { CheckoutInfo } from '../types';

export class CheckoutPage extends BasePage {
  readonly path = '/checkout-step-one.html';

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;
  readonly summaryTotal: Locator;
  readonly backToProductsButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = this.page.getByPlaceholder('First Name');
    this.lastNameInput = this.page.getByPlaceholder('Last Name');
    this.postalCodeInput = this.page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = this.page.locator('[data-test="continue"]');
    this.cancelButton = this.page.locator('[data-test="cancel"]');
    this.errorMessage = this.page.locator('[data-test="error"]');
    this.finishButton = this.page.locator('[data-test="finish"]');
    this.completeHeader = this.page.getByText('Thank you for your order!');
    this.summaryTotal = this.page.locator('[data-test="total-label"]');
    this.backToProductsButton = this.page.locator('[data-test="back-to-products"]');
  }

  async fillCheckoutInfo(info: CheckoutInfo): Promise<void> {
    await this.firstNameInput.fill(info.firstName);
    await this.lastNameInput.fill(info.lastName);
    await this.postalCodeInput.fill(info.postalCode);
    await this.continueButton.click();
  }
}
