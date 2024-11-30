import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AutoComplete } from "../src";

const mockItems = [
  { id: 1, name: "United States" },
  { id: 2, name: "Canada" },
  { id: 3, name: "Mexico" },
];

const onItemSelect = jest.fn();
const onInputChange = jest.fn();

describe("AutoComplete", () => {
  it("should display the input field", () => {
    render(
      <AutoComplete
        filterKey="name"
        items={mockItems}
        onInputChange={onInputChange}
        onItemSelect={onItemSelect}
        placeholder="Search countries"
        loading={false}
        isSelected={false}
      />
    );
    expect(screen.getByPlaceholderText("Search countries")).toBeInTheDocument();
  });

  it("should show items in the dropdown when input value is entered", async () => {
    render(
      <AutoComplete
        filterKey="name"
        items={mockItems}
        onInputChange={onInputChange}
        onItemSelect={onItemSelect}
        placeholder="Search countries"
        loading={false}
        isSelected={false}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Search countries"), {
      target: { value: "Canada" },
    });
    await waitFor(() => expect(screen.getByText("Canada")).toBeInTheDocument());
  });

  it("should call onItemSelect when an item is selected", async () => {
    render(
      <AutoComplete
        filterKey="name"
        items={mockItems}
        onInputChange={onInputChange}
        onItemSelect={onItemSelect}
        placeholder="Search countries"
        loading={false}
        isSelected={false}
      />
    );
    fireEvent.change(screen.getByPlaceholderText("Search countries"), {
      target: { value: "United" },
    });

    // Wait for the list item to be rendered
    await waitFor(() =>
      expect(
        screen.getByRole("option", { name: /United States/i })
      ).toBeInTheDocument()
    );

    // Check if the "United States" item has a yellow background (highlighted)
    const unitedStatesItem = screen.getByText("United");
    expect(unitedStatesItem).toHaveStyle("background-color: yellow");

    fireEvent.click(screen.getByRole("option", { name: /United States/i }));
    expect(onItemSelect).toHaveBeenCalledWith({ id: 1, name: "United States" });
  });
});
