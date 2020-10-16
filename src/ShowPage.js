import React from "react";

function NewLinesToParagraphs({ children }) {
  // These shouldn't be reordered so the index should be a safe key.
  return children
    .trim()
    .split("\n")
    .map((str, idx) => <p key={idx}>{str}</p>);
}

export default function ShowPage({ title: encodedTitle, entries }) {
  const title = React.useMemo(() => decodeURIComponent(encodedTitle), [
    encodedTitle,
  ]);

  React.useEffect(() => {
    document.title = title;
  }, [title]);

  const entry = entries.find((entry) => entry.title === title);
  return (
    <>
      <h1>{title}</h1>
      <NewLinesToParagraphs>{entry.body}</NewLinesToParagraphs>
    </>
  );
}
