import { act, renderHook, waitFor } from "@testing-library/react";
import useFetchData from "../use-fetchdata";

beforeAll(() => {
  globalThis.fetch = jest.fn();
});

describe("useFetchData Hook", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("returns initial state correctly", () => {
    const { result } = renderHook(() => useFetchData("", "", 300));

    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test("fetches data with mock data and filters correctly", async () => {
    const mockData = [{ name: "apple" }, { name: "banana" }, { name: "grape" }];
    const { result } = renderHook(() => useFetchData("", "app", 300, mockData));

    // Simulate debounce time
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 300)); // simulate debounce wait time
    });

    // Use waitFor to wait until the data has been filtered and set
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual([{ name: "apple" }]);
    expect(result.current.error).toBe(null);
  });

  test("fetches data from API successfully", async () => {
    // Mocking fetch success using jest.fn()
    (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([{ id: 1, name: "item1" }]),
    });

    const { result } = renderHook(() =>
      useFetchData("https://api.example.com", "item", 300)
    );

    // Simulate debounce time
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 300)); // simulate debounce wait time
    });

    // Use waitFor to wait until loading is false
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual([{ id: 1, name: "item1" }]);
    expect(result.current.error).toBe(null);
  });

  test("handles API error", async () => {
    (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: "Not Found",
    });

    const { result } = renderHook(() =>
      useFetchData("https://api.example.com", "item", 300)
    );

    // Simulate debounce time
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
    });

    // Use waitFor to wait until the error state is updated
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe("Failed to fetch data");
  });

  test("handles debounce delay", async () => {
    jest.useFakeTimers;
    const mockData = [{ name: "apple" }, { name: "banana" }, { name: "grape" }];
    const { result } = renderHook(() => useFetchData("", "app", 300, mockData));

    // Simulate debounce time
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 300)); // simulate debounce wait time
    });

    // Wait for the data to be filtered
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual([{ name: "apple" }]);
    expect(result.current.error).toBe(null);
  });
});
