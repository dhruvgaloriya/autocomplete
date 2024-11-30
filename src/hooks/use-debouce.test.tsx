import { act, renderHook } from "@testing-library/react";
import useDebounce from "./use-debouce";

jest.useFakeTimers();

describe("useDebounce", () => {
  it("should debounce the input value", () => {
    // Render the hook with initial props
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "test", delay: 500 },
      }
    );

    // Check initial value
    expect(result.current).toBe("test");

    // Update the input value and delay, and trigger rerender
    rerender({ value: "test2", delay: 500 });
    expect(result.current).toBe("test"); // Should not change immediately

    // Fast-forward all timers
    act(() => {
      jest.runAllTimers(); // This simulates the debounce delay
    });

    // After debounce delay, the value should be updated
    expect(result.current).toBe("test2");
  });
});
