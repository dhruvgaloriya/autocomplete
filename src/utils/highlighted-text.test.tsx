import { render } from "@testing-library/react";
import { HighlightTextWithMemo } from "./highlighted-text";

describe("highlightText", () => {
  it("should highlight matching text with background color", () => {
    const inputText = "Hello, this is a test string";
    const query = "test";
    const { container } = render(
      <HighlightTextWithMemo text={inputText} query={query} />
    );

    const highlightedSpan = container.querySelector("span");
    expect(highlightedSpan).toBeInTheDocument();
    expect(highlightedSpan).toHaveStyle("background-color: yellow");
    expect(highlightedSpan?.textContent).toBe("test");

    expect(container).toHaveTextContent("Hello, this is a ");
    expect(container).toHaveTextContent(" string");
  });

  it("should return the original text if no match is found", () => {
    const inputText = "Hello, world!";
    const query = "goodbye";

    const { container } = render(
      <HighlightTextWithMemo text={inputText} query={query} />
    );

    expect(container.textContent).toBe(inputText);
  });

  it("should handle case-insensitive matching", () => {
    const inputText = "Hello, this is a test string";
    const query = "TEST";

    const { container } = render(
      <HighlightTextWithMemo text={inputText} query={query} />
    );
    const highlightedSpan = container.querySelector("span");
    expect(highlightedSpan).toBeInTheDocument();
    expect(highlightedSpan).toHaveStyle("background-color: yellow");
    expect(highlightedSpan?.textContent).toBe("test");
  });

  it("should escape special characters in the query", () => {
    const inputText = "Text with special characters like $ or *";
    const query = "$";

    const { container } = render(
      <HighlightTextWithMemo text={inputText} query={query} />
    );

    const highlightedSpan = container.querySelector("span");
    expect(highlightedSpan).toBeInTheDocument();
    expect(highlightedSpan).toHaveStyle("background-color: yellow");
    expect(highlightedSpan?.textContent).toBe("$");
  });
});
