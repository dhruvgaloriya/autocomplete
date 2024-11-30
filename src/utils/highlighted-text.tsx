export const highlightText = (text: string, query: string): React.ReactNode => {
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
