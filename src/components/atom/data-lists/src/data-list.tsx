import React, { useEffect, useRef } from "react";
import styles from "./data-list.module.css";

interface DataListProps {
  items: { id: number; name: string }[];
  onSelect: (name: string) => void;
  renderItem: (item: { id: number; name: string }) => React.ReactNode;
  activeIndex: number; // Track the currently focused item
  onActiveIndexChange: (index: number) => void; // Update active index
}

const DataList: React.FC<DataListProps> = ({
  items,
  onSelect,
  renderItem,
  activeIndex,
  onActiveIndexChange,
}) => {
  const listRef = useRef<HTMLUListElement | null>(null);
  useEffect(() => {
    console.log("activeIndex=====", activeIndex);
    if (listRef.current && activeIndex >= 0) {
      const activeItem = listRef.current.children[activeIndex] as HTMLElement;
      if (activeItem) {
        activeItem.scrollIntoView({
          block: "nearest",
        });
      }
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
      aria-live="assertive"
    >
      {items.map((item, index) => (
        <li
          key={item.id}
          data-index={index}
          className={`${styles.dataItem} ${
            index === activeIndex ? styles.activeItem : ""
          }`}
          onClick={() => onSelect(item.name)}
          role="option"
          aria-selected={index === activeIndex}
          onMouseMove={() => handleMouseEnter(index)}
          tabIndex={index === activeIndex ? 0 : -1}
        >
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
};

export { DataList };
export type { DataListProps };
