import React, { useEffect, useRef } from "react";
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
  const inputRef = useRef<HTMLInputElement | null>(null); // Ref for input element
  // Focus input field on mount (or reset) to ensure VoiceOver announces it
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // Focus input element
    }
  }, []); // Only on initial mount

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value);
  };

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.leftIcon}>
        <span>🔍</span>
      </div>
      <input
        ref={inputRef} // Assign ref to the input element
        className={styles.inputField}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        aria-label={placeholder}
        aria-busy={showLoader}
        tabIndex={0}
        aria-live="polite"
        onKeyDown={onKeyDown}
      />
      {showLoader && <div className={styles.loader}></div>}
    </div>
  );
};

export { Input };
export type { InputProps };
