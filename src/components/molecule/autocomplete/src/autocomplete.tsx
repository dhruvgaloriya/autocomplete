import { DataList } from "@/components/atom/data-lists/src";
import { Input } from "@/components/atom/input/src";
import { highlightText } from "@/utils/highlighted-text";
import React, { useEffect, useState } from "react";
import styles from "./autocomplete.module.css";

interface AutoCompleteProps<T> {
  items: T[];
  filterKey: keyof T; // Key used for filtering items (e.g., 'name')
  placeholder: string;
  onSelect: (item: T) => void; // Callback when an item is selected
  debounceDelay?: number; // Optional debounce delay for input
  renderItem?: (item: T, query: string) => React.ReactNode; // Custom render logic for each item
}

const AutoComplete = <T extends { id: number }>({
  items,
  filterKey,
  placeholder = "Search...",
  onSelect,
  debounceDelay = 300,
  renderItem,
}: AutoCompleteProps<T>) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<T[]>([]);
  const [debouncedValue, setDebouncedValue] = useState<string>("");

  // Debounce logic for input value
  useEffect(() => {
    const handler = setTimeout(
      () => setDebouncedValue(inputValue),
      debounceDelay
    );
    return () => clearTimeout(handler);
  }, [inputValue, debounceDelay]);

  // Filter items based on debounced value
  useEffect(() => {
    if (!debouncedValue) {
      setFilteredItems([]);
    } else {
      const lowerCaseValue = debouncedValue.toLowerCase();
      const filtered = items.filter((item) =>
        String(item[filterKey]).toLowerCase().includes(lowerCaseValue)
      );
      setFilteredItems(filtered);
    }
  }, [debouncedValue, items, filterKey]);

  // Handle item selection
  const handleSelect = (item: T) => {
    setInputValue(String(item[filterKey]));
    setFilteredItems([]);
    onSelect(item);
  };

  return (
    <div className={styles.autoComplete}>
      <Input
        value={inputValue}
        onInputChange={setInputValue}
        placeholder={placeholder}
      />
      {filteredItems.length > 0 && (
        <DataList
          items={filteredItems}
          onSelect={(name) => {
            const selectedItem = filteredItems.find(
              (item) => String(item[filterKey]) === name
            );
            if (selectedItem) handleSelect(selectedItem);
          }}
          renderItem={(item) => (
            <div>{highlightText(String(item[filterKey]), inputValue)}</div>
          )}
        />
      )}
    </div>
  );
};

export { AutoComplete };
export type { AutoCompleteProps };
