import { DataList } from "@/components/atom/data-lists/src";
import { Input } from "@/components/atom/input/src";
import { highlightText } from "@/utils/highlighted-text";
import { useEffect, useState } from "react";
import styles from "./autocomplete.module.css";

interface AutoCompleteProps<T> {
  placeholder?: string;
  filterKey: keyof T; // Key to filter by (e.g., "name")
  items: T[]; // List of items to display
  onInputChange: (query: string) => void; // Callback to notify parent of input changes
  onItemSelect: (item: T) => void; // Callback when an item is selected
  loading?: boolean; // Show loading state
}

const AutoComplete = <T extends { id: number }>({
  placeholder = "Search...",
  filterKey,
  items,
  onInputChange,
  onItemSelect,
  loading = false,
}: AutoCompleteProps<T>) => {
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    onInputChange(inputValue); // Notify parent of input changes
  }, [inputValue, onInputChange]);

  return (
    <div className={styles.autoComplete}>
      <Input
        value={inputValue}
        onInputChange={setInputValue}
        placeholder={placeholder}
      />
      {loading && <p>Loading...</p>}
      {items.length === 0 && inputValue && !loading && <p>No items found.</p>}
      {items.length > 0 && (
        <DataList
          items={items}
          onSelect={(name) => {
            const selectedItem = items.find(
              (item) => String(item[filterKey]) === name
            );
            if (selectedItem) {
              onItemSelect(selectedItem);
              setInputValue(String(selectedItem[filterKey])); // Update input with selected value
            }
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

//   const [filteredItems, setFilteredItems] = useState<T[]>([]);
//   const [debouncedValue, setDebouncedValue] = useState<string>("");

// Debounce logic for input value
//   useEffect(() => {
//     const handler = setTimeout(
//       () => setDebouncedValue(inputValue),
//       debounceDelay
//     );
//     return () => clearTimeout(handler);
//   }, [inputValue, debounceDelay]);

// Filter items based on debounced value
//   useEffect(() => {
//     if (!debouncedValue) {
//       setFilteredItems([]);
//     } else {
//       const lowerCaseValue = debouncedValue.toLowerCase();
//       const filtered = items.filter((item) =>
//         String(item[filterKey]).toLowerCase().includes(lowerCaseValue)
//       );
//       setFilteredItems(filtered);
//     }
//   }, [debouncedValue, items, filterKey]);

// Handle item selection
//   const handleSelect = (item: T) => {
//     setInputValue(String(item[filterKey]));
//     setFilteredItems([]);
//     onSelect(item);
//   };
