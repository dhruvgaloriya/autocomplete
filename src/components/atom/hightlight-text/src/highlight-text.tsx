import React from "react";

interface HighlightTextProps {
  text: string; // The full text to display
  query: string; // The text to highlight
  highlightStyle?: React.CSSProperties; // Optional custom styles for the highlight
}

const HighlightText: React.FC<HighlightTextProps> = ({
  text,
  query,
  highlightStyle,
}) => {
  if (!query) return <>{text}</>;

  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <span
            key={index}
            style={highlightStyle || { backgroundColor: "yellow" }}
          >
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
};

export { HighlightText };
export type { HighlightTextProps };
