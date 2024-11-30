import React from "react";
import styles from "./input.module.css";

interface InputProps {
  placeholder: string;
  onInputChange: (value: string) => void;
  value: string;
  showLoader?: boolean; // Loader visibility
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  onInputChange,
  value,
  showLoader = false,
  onKeyDown,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value);
  };

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.leftIcon}>
        <span>🔍</span>
      </div>
      <input
        className={styles.inputField}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        aria-label={placeholder}
        aria-busy={showLoader}
        onKeyDown={onKeyDown}
      />
      {showLoader && <div className={styles.loader}></div>}
    </div>
  );
};

export { Input };
export type { InputProps };
