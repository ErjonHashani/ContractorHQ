import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../ui/Button";

describe("Button component", () => {
  test("renders children correctly", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  test("shows loading spinner when loading prop is true", () => {
    render(<Button loading>Loading</Button>);
    const spinner = screen.getByLabelText(/loading spinner/i);
    expect(spinner).toBeInTheDocument();
  });

  test("disables button when disabled or loading", () => {
    const { rerender } = render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();

    rerender(<Button loading>Loading</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("calls onClick handler when clicked", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
