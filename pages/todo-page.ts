import { expect, Locator, Page } from '@playwright/test';

export class TodoPage {
  readonly page: Page;
  readonly newTodoInput: Locator;
  readonly todoItems: Locator;
  readonly todoTitle: Locator;
  readonly todoToggle: Locator;
  readonly deleteTodoItem: Locator;
  readonly allFilter: Locator;
  readonly activeFilter: Locator;
  readonly completedFilter: Locator;
  readonly markAllCompleteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTodoInput = this.page.getByRole('textbox', { name: 'What needs to be done?' });
    this.todoItems = this.page.locator('.todo-list li');
    this.todoTitle = this.page.getByTestId('todo-title');
    this.todoToggle = this.page.getByRole('checkbox', { name: 'Toggle Todo' });
    this.deleteTodoItem = this.page.getByRole('button', { name: 'Delete' });
    this.allFilter = this.page.getByRole('link', { name: 'All' });
    this.activeFilter = this.page.getByRole('link', { name: 'Active' });
    this.completedFilter = this.page.getByRole('link', { name: 'Completed' });
    this.markAllCompleteButton = this.page.getByText('Mark all as complete');
  }

  async generateTodoTitle(): Promise<string> {
    const { faker } = await import('@faker-js/faker');
    return faker.string.alphanumeric(12);
  }

  async goto() {
    const todoUrl = process.env.BASE_URL ?? 'https://demo.playwright.dev/todomvc/#/';
    await this.page.goto(todoUrl);
  }

    todoRow(todoText: string) {
    return this.todoItems.filter({ hasText: todoText });
  }

  async addTodo(todoText: string) {
    await this.newTodoInput.fill(todoText);
    await this.newTodoInput.press('Enter');
  }

  async deleteTodo(todoText: string) {
    const todo = this.todoRow(todoText);
    await todo.hover();
    await todo.locator(this.deleteTodoItem).click();
  }

  async markTodoComplete(todoText: string) {
    const todo = this.todoRow(todoText);
    await todo.locator(this.todoToggle).check();
  }

  async filterBy(filterName: 'All' | 'Active' | 'Completed') {
    const filter = filterName === 'All' ? this.allFilter : filterName === 'Active' ? this.activeFilter : this.completedFilter;
    await filter.click();
  }
}
