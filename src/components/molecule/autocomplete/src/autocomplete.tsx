import { DataList } from "@/components/atom/data-lists/src";
import { Input } from "@/components/atom/input/src";
import { highlightText } from "@/utils/highlighted-text";
import { useEffect, useState } from "react";
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
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prevIndex) =>
        prevIndex < items.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : items.length - 1
      );
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      const selectedItem = items[activeIndex];
      if (selectedItem) {
        onItemSelect(selectedItem);
        setInputValue(String(selectedItem[filterKey]));
        setDropdownOpen(false);
        setActiveIndex(-1);
      }
    } else if (e.key === "Escape") {
      setDropdownOpen(false);
    }
  };

  const handleItemSelect = (id: number) => {
    const selectedItem = items.find((item) => item.id === id);
    if (selectedItem) {
      onItemSelect(selectedItem);
      setInputValue(String(selectedItem[filterKey]));
      setDropdownOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div className={styles.autoComplete}>
      <Input
        value={inputValue}
        onInputChange={(value) => {
          setInputValue(value);
          onInputChange(value);
        }}
        placeholder={placeholder}
        showLoader={loading}
        onKeyDown={handleKeyDown}
      />
      {isDropdownOpen && !loading && items.length > 0 && (
        <DataList
          items={items}
          onSelect={handleItemSelect}
          renderItem={(item) =>
            highlightText(String(item[filterKey]), inputValue)
          }
          activeIndex={activeIndex}
          onActiveIndexChange={setActiveIndex}
        />
      )}
      {items.length === 0 && isDropdownOpen && !loading && (
        <p className={styles.message}>No items found.</p>
      )}
    </div>
  );
};
export { AutoComplete };
export type { AutoCompleteProps };
