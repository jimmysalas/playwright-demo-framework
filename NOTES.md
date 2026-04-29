# ncontracts-coding

A focused Playwright TodoMVC automation project using TypeScript.

## Write Up Answers

- What would you add or improve if you had another hour? 
If I had more time, I would add cleanup steps after each test ensuring that data doesn't build up over time, and cause the environment to become slow. Leftover data not being used in the environment takes up valuable resources. 
- How would you integrate this suite into a CI/CD pipeline?
I would add tags to each test, that way I can control which tests I want to run in a nightly regression run vs. a smoke test for each pull request. I would then edit the circleci config file to define the different jobs with the corresponding tags.
- Is there anything about this app's behavior that surprised or concerned you from a quality standpoint?
I was surprised there wasn't a button to add the todo item. Usually, there's a button for create actions. I was not expecting to only be able to press Enter to accomplish this.
The stacked card design was also somewhat misleading, as it can give the impression that there are more todo items existing than are actually present.


## Architecture

```
pages/
└── todo-page.ts

tests/
└── todo.spec.ts
```

## Test Coverage

| # | Test Name | Description |
|---|-----------|-------------|
| 1 | Add a new Todo item | Adds a todo, and asserts it appears in the list |
| 2 | Mark a Todo item as complete | Adds a todo, marks it complete, filters by Completed and asserts visibility |
| 3 | Delete a Todo item | Adds a todo, deletes it, asserts it is no longer visible |
| 4 | Filter Todo items by Active and Completed | Adds two todos, completes one, verifies each appears only in its correct filter view |
| 5 | Attempt to add an empty Todo item | Presses Enter on a blank input and asserts no Todo is created |

## Session Notes

- Implemented `TodoPage` class using Page Object Model with all locators defined as `readonly` properties in the constructor
- Integrated **Faker.js** (`@faker-js/faker`) for unique, random test data — `generateTodoTitle()` returns a 12-char alphanumeric string
- Assertions use `todoPage.todoTitle.filter({ hasText })` for scoped, precise visibility checks

## Author

**Jimmy Salas** - [GitHub](https://github.com/jimmysalas)
