import { test, expect } from '../src/fixtures/base-test';
import { USERS } from '../src/types';

test.describe('Login', () => {
  test('successful login with valid credentials', async ({ loginPage, inventoryPage }) => {
    await loginPage.navigate();
    await loginPage.login(USERS.standard.username, USERS.standard.password);

    await expect(inventoryPage.title).toBeVisible();
    await expect(loginPage.page).toHaveURL(/inventory/);
  });

  test('login fails with locked out user', async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.login(USERS.lockedOut.username, USERS.lockedOut.password);

    await expect(loginPage.errorMessage).toContainText('locked out');
  });

  test('login fails with invalid credentials', async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.login(USERS.invalid.username, USERS.invalid.password);

    await expect(loginPage.errorMessage).toContainText('do not match');
  });
});
