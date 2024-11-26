import React from "react";
import styles from "./data-list.module.css";

interface DataListProps {
  items: { id: number; name: string }[];
  onSelect: (name: string) => void;
  renderItem: (item: { id: number; name: string }) => React.ReactNode;
}

const DataList: React.FC<DataListProps> = ({ items, onSelect, renderItem }) => {
  return (
    <ul className={styles.dataList}>
      {items.map((item) => (
        <li
          key={item.id}
          className={styles.dataItem}
          onClick={() => onSelect(item.name)}
        >
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
};

export { DataList };
export type { DataListProps };
