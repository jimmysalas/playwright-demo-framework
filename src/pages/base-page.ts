import type { Locator, Page } from '@playwright/test';

export abstract class BasePage {
  abstract readonly path: string;

  constructor(protected readonly page: Page) {}

  async navigate(): Promise<void> {
    await this.page.goto(this.path);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  getByRole(role: Parameters<Page['getByRole']>[0], options?: Parameters<Page['getByRole']>[1]): Locator {
    return this.page.getByRole(role, options);
  }

  getByText(text: string | RegExp, options?: { exact?: boolean }): Locator {
    return this.page.getByText(text, options);
  }
}
