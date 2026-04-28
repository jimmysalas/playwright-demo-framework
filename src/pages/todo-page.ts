// pages/TodoPage.ts
import { expect, Locator, Page } from '@playwright/test';

export class TodoPage {
  readonly page: Page;
  readonly newTodoInput: Locator;
  readonly todoItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTodoInput = this.page.getByRole('textbox', { name: 'What needs to be done?' });
    this.todoItems = this.page.locator('.todo-list li');
  }

  async goto() {
    const todoUrl = process.env.BASE_URL ?? 'https://demo.playwright.dev/todomvc/#/';
    await this.page.goto(todoUrl);
  }

  async addTodo(todoText: string) {
    await this.newTodoInput.fill(todoText);
    await this.newTodoInput.press('Enter');
  }

  async expectTodoVisible(todoText: string) {
    await expect(this.page.getByText(todoText)).toBeVisible();
  }

  async markTodoComplete(todoText: string) {
    const todo = this.todoItems.filter({ hasText: todoText });
    await todo.getByLabel('Toggle Todo').check();
  }

  async expectTodoCompleted(todoText: string) {
    const todo = this.todoItems.filter({ hasText: todoText });
    await expect(todo).toHaveClass(/completed/);
  }

  async deleteTodo(todoText: string) {
    const todo = this.todoItems.filter({ hasText: todoText });
    await todo.hover();
    await todo.locator('.destroy').click();
  }

  async filterBy(filterName: 'Active' | 'Completed') {
    await this.page.getByRole('link', { name: filterName }).click();
  }
}