import { test, expect } from '@playwright/test';
import { TodoPage } from '../src/pages/todo-page';

test.describe('TodoMVC', () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test('Add a new Todo item', async () => {
    await todoPage.addTodo('New Todo Item');

    await todoPage.expectTodoVisible('New Todo Item');
  });

  test('Mark a Todo item as complete', async () => {
    await todoPage.addTodo('Completed Todo Item');
    await todoPage.markTodoComplete('Completed Todo Item');

    await todoPage.expectTodoCompleted('Completed Todo Item');
  });

  test('Delete a Todo item', async () => {
    await todoPage.addTodo('Delete Todo Item');
    await todoPage.deleteTodo('Delete Todo Item');

    await expect(todoPage.todoItems).toHaveCount(0);
    await expect(todoPage.page.getByText('Delete Todo Item')).toBeHidden();
  });

  test('Filter Todo items by Active and Completed', async () => {
    await todoPage.addTodo('Active task');
    await todoPage.addTodo('Completed task');
    await todoPage.markTodoComplete('Completed task');

    await todoPage.filterBy('Active');
    await expect(todoPage.page.getByText('Active task')).toBeVisible();
    await expect(todoPage.page.getByText('Completed task')).toBeHidden();

    await todoPage.filterBy('Completed');
    await expect(todoPage.page.getByText('Completed task')).toBeVisible();
    await expect(todoPage.page.getByText('Active task')).toBeHidden();
  });

  test('Attempt to add an empty Todo item', async () => {
    // User should press Enter on a blank field.
    // The app should not create empty todos.
    await todoPage.newTodoInput.press('Enter');

    await expect(todoPage.todoItems).toHaveCount(0);
  });
});
