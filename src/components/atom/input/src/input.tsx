import { memo, useCallback, useEffect, useRef } from "react";
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
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onInputChange(event.target.value);
    },
    [onInputChange]
  );

  // Clear the input field
  const handleClearInput = () => {
    onInputChange("");
    inputRef.current?.focus();
  };

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.leftIcon} aria-hidden="true">
        <span>🔍</span>
      </div>
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
      {!showLoader && value && (
        <button
          className={styles.clearButton}
          onClick={handleClearInput}
          aria-label="Clear input"
        >
          ✖
        </button>
      )}
      {showLoader && (
        <div className={styles.loader} data-testid={InputTestIds.Loader}></div>
      )}
    </div>
  );
};

const MemoizedInput = memo(Input);

export { MemoizedInput as Input };
export type { InputProps };
