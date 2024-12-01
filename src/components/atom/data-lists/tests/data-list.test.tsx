import { fireEvent, render, screen } from "@testing-library/react";
import { DataList } from "../src";

const items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
];

const onSelect = jest.fn();
const onActiveIndexChange = jest.fn();

describe("DataList Atom Test Suite", () => {
  it("should render a list of items", () => {
    render(
      <DataList
        items={items}
        onSelect={onSelect}
        renderItem={(item) => <span>{item.name}</span>}
        activeIndex={-1}
        onActiveIndexChange={onActiveIndexChange}
      />
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });

  it("updates activeIndex on hover", () => {
    const handleActiveIndexChange = jest.fn();
    render(
      <DataList
        items={items}
        onSelect={jest.fn()}
        renderItem={(item) => <span>{item.name}</span>}
        activeIndex={-1}
        onActiveIndexChange={handleActiveIndexChange}
      />
    );

    fireEvent.mouseMove(screen.getByText("Item 3"));
    expect(handleActiveIndexChange).toHaveBeenCalledWith(2);
  });

  it("should call onSelect when an item is clicked", () => {
    render(
      <DataList
        items={items}
        onSelect={onSelect}
        renderItem={(item) => <span>{item.name}</span>}
        activeIndex={-1}
        onActiveIndexChange={onActiveIndexChange}
      />
    );
    fireEvent.click(screen.getByText("Item 2"));
    expect(onSelect).toHaveBeenCalledWith(2);
  });

  it("should update active index on mouse move", () => {
    render(
      <DataList
        items={items}
        onSelect={onSelect}
        renderItem={(item) => <span>{item.name}</span>}
        activeIndex={-1}
        onActiveIndexChange={onActiveIndexChange}
      />
    );
    fireEvent.mouseMove(screen.getByText("Item 3"));
    expect(onActiveIndexChange).toHaveBeenCalledWith(2);
  });
});
