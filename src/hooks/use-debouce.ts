import { useEffect, useState } from "react";

function useDebounce<T>(inputValue: T, debounceDelay: number = 1000): T {
  const [delayedValue, setDelayedValue] = useState(inputValue);

  useEffect(() => {
    const handler = setTimeout(
      () => setDelayedValue(inputValue),
      debounceDelay
    );

    return () => clearTimeout(handler);
  }, [inputValue, debounceDelay]);

  return delayedValue;
}

export default useDebounce;
