import { useEffect, useRef } from "react";
import { InputTestIds } from "./input-test-ids.enum";
import styles from "./input.module.css";

interface InputProps {
  placeholder: string;
  onInputChange: (value: string) => void;
  value: string;
  showLoader?: boolean; // Loader visibility
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void; // Handle keyboard events
}

const Input: React.FC<InputProps> = ({
  placeholder,
  onInputChange,
  value,
  showLoader = false,
  onKeyDown,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto-focus the input field on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle changes in the input field
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(event.target.value);
  };

  return (
    <div className={styles.inputWrapper}>
      {/* Left Icon */}
      <div className={styles.leftIcon} aria-hidden="true">
        <span>🔍</span>
      </div>
      {/* Input Field */}
      <input
        ref={inputRef}
        className={styles.inputField}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        aria-label={value}
        tabIndex={0}
        onKeyDown={onKeyDown}
      />
      {/* Loader Indicator */}
      {showLoader && (
        <div className={styles.loader} data-testid={InputTestIds.Loader}></div>
      )}
    </div>
  );
};

export { Input };
export type { InputProps };
