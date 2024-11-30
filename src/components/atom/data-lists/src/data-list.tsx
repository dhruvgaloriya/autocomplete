import { useEffect, useRef } from "react";
import styles from "./data-list.module.css";

interface DataListProps<T> {
  items: T[];
  onSelect: (id: number) => void; // Callback when an item is selected
  renderItem: (item: T) => React.ReactNode; // Render function for list items
  activeIndex: number; // Index of the currently active item
  onActiveIndexChange: (index: number) => void; // Update the active index
}

const DataList = <T extends { id: number }>({
  items,
  onSelect,
  renderItem,
  activeIndex,
  onActiveIndexChange,
}: DataListProps<T>) => {
  const listRef = useRef<HTMLUListElement | null>(null);

  // Ensure the active item is visible in the viewport
  useEffect(() => {
    if (listRef.current && activeIndex >= 0) {
      const activeItem = listRef.current.children[activeIndex] as HTMLElement;
      activeItem?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const handleMouseEnter = (index: number) => {
    if (index !== activeIndex) {
      onActiveIndexChange(index); // Update active index when hovering
    }
  };
  return (
    <ul
      className={styles.dataList}
      role="listbox"
      aria-activedescendant={`item-${activeIndex}`}
      ref={listRef}
      aria-live="polite"
    >
      {items.map((item, index) => {
        const isActive = index === activeIndex;

        return (
          <li
            key={item.id}
            id={`item-${index}`}
            data-index={index}
            className={`${styles.dataItem} ${
              isActive ? styles.activeItem : ""
            }`}
            role="option"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(item.id)}
            onMouseMove={() => handleMouseEnter(index)}
          >
            {renderItem(item)}
          </li>
        );
      })}
    </ul>
  );
};

export { DataList };
export type { DataListProps };
