import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/todo-page'; //brings in the class to file

test.describe('TodoMVC', () => {
  let todoPage: TodoPage; //makes it accessible to all tests in this block

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page); //creates a fresh instance of the page object for each test
    await todoPage.goto();
  });

  test('Add a new Todo item', async () => {
    const todoTitle = await todoPage.generateTodoTitle();
    await todoPage.addTodo(todoTitle); // inside addTodo, todoText now equals todoTitle's value
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

  test('Edit a Todo item', async () => {
    const originalTitle = await todoPage.generateTodoTitle();
    const updatedTitle = await todoPage.generateTodoTitle();
    await todoPage.addTodo(originalTitle);
    await expect(todoPage.todoTitle.filter({ hasText: originalTitle })).toBeVisible();
    await todoPage.editTodo(originalTitle, updatedTitle);
    await expect(todoPage.todoTitle.filter({ hasText: originalTitle })).toBeHidden();
    await expect(todoPage.todoTitle.filter({ hasText: updatedTitle })).toBeVisible();
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
