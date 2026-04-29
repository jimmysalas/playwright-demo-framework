import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/todo-page';

test.describe('TodoMVC', () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test('Add a new Todo item', async () => {
    const todoTitle = await todoPage.generateTodoTitle();
    await todoPage.addTodo(todoTitle);
    await expect(todoPage.todoTitle.filter({ hasText: todoTitle })).toBeVisible();
  });

  test('Mark a Todo item as complete', async () => {
    const todoTitle = await todoPage.generateTodoTitle();
    await todoPage.addTodo(todoTitle);
    await todoPage.markTodoComplete(todoTitle);
    await todoPage.filterBy('Completed');
    await expect(todoPage.todoTitle.filter({ hasText: todoTitle })).toBeVisible();
  });

  test('Delete a Todo item', async () => {
    const todoTitle = await todoPage.generateTodoTitle();
    await todoPage.addTodo(todoTitle);
    await expect(todoPage.todoTitle.filter({ hasText: todoTitle })).toBeVisible();
    await todoPage.deleteTodo(todoTitle);
    await expect(todoPage.todoTitle.filter({ hasText: todoTitle })).toBeHidden();
  });

  test('Filter Todo items by Active and Completed', async () => {
    const activeTask = await todoPage.generateTodoTitle();
    const completedTask = await todoPage.generateTodoTitle();
    await todoPage.addTodo(activeTask);
    await todoPage.addTodo(completedTask);
    await todoPage.markTodoComplete(completedTask);
    await todoPage.filterBy('Active');
    await expect(todoPage.todoTitle.filter({ hasText: activeTask })).toBeVisible();
    await expect(todoPage.todoTitle.filter({ hasText: completedTask })).toBeHidden();
    await todoPage.filterBy('Completed');
    await expect(todoPage.todoTitle.filter({ hasText: completedTask })).toBeVisible();
    await expect(todoPage.todoTitle.filter({ hasText: activeTask })).toBeHidden();
  });

  test('Attempt to add an empty Todo', async () => {
    // Pressing Enter on an empty input should not create a todo item.
    const beforeCount = await todoPage.todoTitle.count();
    await todoPage.newTodoInput.press('Enter');
    await expect(todoPage.todoTitle).toHaveCount(beforeCount);
  });
});
