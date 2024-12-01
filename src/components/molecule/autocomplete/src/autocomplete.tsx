import { DataList } from "@/components/atom/data-lists/src";
import { Input } from "@/components/atom/input/src";
import { HighlightText } from "@/utils/highlighted-text";
import { useCallback, useEffect, useState } from "react";
import styles from "./autocomplete.module.css";

interface AutoCompleteProps<T> {
  placeholder?: string;
  filterKey: keyof T;
  items: T[];
  onInputChange: (query: string) => void;
  onItemSelect: (item: T) => void;
  loading?: boolean;
  isSelected: boolean;
}

const AutoComplete = <T extends { id: number }>({
  placeholder = "Search...",
  filterKey,
  items,
  onInputChange,
  onItemSelect,
  loading = false,
  isSelected,
}: AutoCompleteProps<T>) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [activeIndex, setActiveIndex] = useState<number>(-1); // Track active dropdown item
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    // Trigger search when the inputValue changes and no item is selected
    if (inputValue && !isSelected) {
      setDropdownOpen(true);
    } else {
      setDropdownOpen(false);
      setActiveIndex(-1);
    }
  }, [inputValue, isSelected]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const itemCount = items.length;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prevIndex) => (prevIndex + 1) % itemCount);
        break;

      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : itemCount - 1
        );
        break;

      case "Enter":
        if (activeIndex >= 0) {
          e.preventDefault();
          const selectedItem = items[activeIndex];
          handleItemSelect(selectedItem);
        }
        break;

      case "Escape":
        setDropdownOpen(false);
        break;
    }
  };

  const handleItemSelect = (item: T) => {
    onItemSelect(item);
    setInputValue(String(item[filterKey]));
    setDropdownOpen(false);
    setActiveIndex(-1);
  };

  // Handle selection by ID (e.g., from the rendered DataList)
  const handleDataListItemSelect = (id: number) => {
    const selectedItem = items.find((item) => item.id === id);
    if (selectedItem) handleItemSelect(selectedItem);
  };

  const handleInputChange = useCallback(
    (value: string) => {
      if (isSelected) setActiveIndex(-1);
      setInputValue(value);
      onInputChange(value);
    },
    [onInputChange, isSelected]
  );

  return (
    <div className={styles.autoComplete}>
      <Input
        value={inputValue}
        onInputChange={handleInputChange}
        placeholder={placeholder}
        showLoader={loading}
        onKeyDown={handleKeyDown}
      />
      {isDropdownOpen && !loading && (
        <>
          {items.length > 0 ? (
            <DataList
              items={items}
              onSelect={handleDataListItemSelect}
              renderItem={(item) => (
                <HighlightText
                  text={String(item[filterKey])}
                  query={inputValue.trim()}
                />
              )}
              activeIndex={activeIndex}
              onActiveIndexChange={setActiveIndex}
            />
          ) : (
            <p
              className={styles.message}
              tabIndex={0}
              aria-label="No items found"
            >
              No items found.
            </p>
          )}
        </>
      )}
    </div>
  );
};
export { AutoComplete };
export type { AutoCompleteProps };
