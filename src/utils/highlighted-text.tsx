import { useMemo } from "react";

const highlightText = (text: string, query: string): React.ReactNode => {
  if (!query) return text;

  // Escape special regex characters in the query
  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, "\\$&"); // Escapes special characters
  };

  const escapedQuery = escapeRegExp(query); // Escape the query string

  const regex = new RegExp(`(${escapedQuery})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} style={{ backgroundColor: "yellow" }}>
        {part}
      </span>
    ) : (
      part
    )
  );
};

export const HighlightText = ({
  text,
  query,
}: {
  text: string;
  query: string;
}) => {
  // Memoize the highlighted text to avoid recalculating on every render
  const highlightedText = useMemo(
    () => highlightText(text, query),
    [text, query]
  );

  return <>{highlightedText}</>;
};
