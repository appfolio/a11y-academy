import React from "react";
import { useParams } from "react-router";
import type { Entry } from "./sharedTypes";

function NewLinesToParagraphs({ children }: { children: string }) {
  // These shouldn't be reordered so the index should be a safe key.
  return (
    <>
      {children
        .trim()
        .split("\n")
        .map((str, idx) => (
          <p key={idx}>{str}</p>
        ))}
    </>
  );
}

export type ShowPageProps = {
  entries: Entry[];
};

export default function ShowPage({ entries }: ShowPageProps) {
  const { title: encodedTitle } = useParams();
  const title = React.useMemo(
    () => decodeURIComponent(encodedTitle || ""),
    [encodedTitle]
  );

  React.useEffect(() => {
    document.title = title;
  }, [title]);

  const entry = entries.find((entry) => entry.title === title);

  if (entry === undefined)
    throw new Error(`No entry found for title "${title}"`);

  return (
    <>
      <h1>{title}</h1>
      <NewLinesToParagraphs>{entry.body}</NewLinesToParagraphs>
    </>
  );
}
