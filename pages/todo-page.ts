import { expect, Locator, Page } from '@playwright/test';

export class TodoPage {
  readonly page: Page;
  readonly newTodoInput: Locator;
  readonly todoItems: Locator; //all li elements in the todo list
  readonly todoTitle: Locator;
  readonly allFilter: Locator;
  readonly activeFilter: Locator;
  readonly completedFilter: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTodoInput = this.page.getByRole('textbox', { name: 'What needs to be done?' });
    this.todoItems = this.page.locator('.todo-list li');
    this.todoTitle = this.page.getByTestId('todo-title');
    this.allFilter = this.page.getByRole('link', { name: 'All' });
    this.activeFilter = this.page.getByRole('link', { name: 'Active' });
    this.completedFilter = this.page.getByRole('link', { name: 'Completed' });
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
    return this.todoItems.filter({ hasText: todoText }); //all li elements in the todo list
  }

  todoToggle(todo: Locator) {
    return todo.getByRole('checkbox', { name: 'Toggle Todo' });
  }

  deleteButton(todo: Locator) {
    return todo.getByRole('button', { name: 'Delete' });
  }

  todoTitleInRow(todo: Locator) {
    return todo.getByTestId('todo-title');
  }
// inside addTodo, todoText now equals todoTitle's value
  async addTodo(todoText: string) {
    await this.newTodoInput.fill(todoText);
    await this.newTodoInput.press('Enter');
  }

  async deleteTodo(todoText: string) {
    const todo = this.todoRow(todoText);
    await todo.hover(); //hovers over line above, matching text
    await this.deleteButton(todo).click();//todo means clicking specific delete button
  }

  async markTodoComplete(todoText: string) {
    const todo = this.todoRow(todoText);
    await this.todoToggle(todo).check(); //moves up a level to row content container where title and toggle exist, todoTitle searches inside title node and finds nothing
  }

  async editTodo(existingText: string, updatedText: string) {
    const todo = this.todoRow(existingText);
    await this.todoTitleInRow(todo).dblclick();
    const editInput = todo.getByRole('textbox', { name: 'Edit' });
    await editInput.fill(updatedText);
    await editInput.press('Enter');
  }
//explicitly compare first 2, if not, then it must be Completed. could refactor. this is nested conditional as currently set up
  async filterBy(filterName: 'All' | 'Active' | 'Completed') {
    const filter = filterName === 'All' ? this.allFilter : filterName === 'Active' ? this.activeFilter : this.completedFilter;
    await filter.click();
  }
}
