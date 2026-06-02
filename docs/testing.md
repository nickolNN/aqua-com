# Testing Guidelines

## Test Types

- Unit tests for utilities and hooks
- Component tests using React Testing Library
- Integration tests for API endpoints with MSW
- Aim for high coverage on core features (tasks, contacts, activities)

## Running Tests

```bash
pnpm test
pnpm test -- --coverage
```

## Conventions

- Use React Testing Library for frontend component tests
- Write tests for utilities and hooks
- Write integration tests for API endpoints with MSW
- Aim for high coverage on core features (tasks, contacts, activities)

## Examples

### Good

```typescript
import { render, screen } from "@testing-library/react";
import { TaskItem } from "./TaskItem";

describe("TaskItem", () => {
  it("renders task title", () => {
    render(<TaskItem task={{ id: "1", title: "Test" } as Task} />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
```

### Avoid

```typescript
// Don't use jQuery-style selectors
expect(document.querySelector(".task-title")).toHaveText("Test");
```
