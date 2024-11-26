import React from "react";

import styles from "./input.module.css";

interface InputProps {
  placeholder: string;
  onInputChange: (value: string) => void;
  value: string;
}

const Input: React.FC<InputProps> = ({ placeholder, onInputChange, value }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value);
  };

  return (
    <div className={styles.inputContainer}>
      <input
        className={styles.inputField}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
};

export { Input };
export type { InputProps };
