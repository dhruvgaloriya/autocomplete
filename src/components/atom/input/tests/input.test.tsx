// src/components/atom/input/input.test.tsx

import { fireEvent, render, screen } from "@testing-library/react";
import { Input } from "../src";
import { InputTestIds } from "../src/input-test-ids.enum";

describe("Input", () => {
  it("should render the input field with the correct placeholder", () => {
    render(
      <Input value="" onInputChange={jest.fn()} placeholder="Search..." />
    );
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("should call onInputChange when typing", () => {
    const handleChange = jest.fn();
    render(
      <Input value="" onInputChange={handleChange} placeholder="Search..." />
    );
    fireEvent.change(screen.getByPlaceholderText("Search..."), {
      target: { value: "test" },
    });
    expect(handleChange).toHaveBeenCalledWith("test");
  });

  it("should show a loader when showLoader is true", () => {
    render(
      <Input
        value="hello"
        onInputChange={jest.fn()}
        placeholder="Search..."
        showLoader={true}
      />
    );
    expect(screen.getByTestId(InputTestIds.Loader)).toBeInTheDocument(); // Loader should be present
  });
});
