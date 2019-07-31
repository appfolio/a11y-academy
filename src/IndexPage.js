import { Link } from "@reach/router";
import React from "react";
import { Button } from "reactstrap";
import data from "./seeddata.json";
import TILCard from "./TILCard";

function NewLinesToParagraphs({ children }) {
  // These shouldn't be reordered so the index should be a safe key.
  return children
    .trim()
    .split("\n")
    .map((str, idx) => <p key={idx}>{str}</p>);
}

export default function IndexPage() {
  React.useEffect(() => {
    document.title = "Today We Learned";
  }, []);

  return (
    <>
      <header>
        <h1>Today We Learned</h1>
        <p>
          A bunch of write ups about something a team learned. Failure is ok as
          long as we learn from it!
        </p>
      </header>
      <Button
        className="btn-block mb-5 text-decoration-none"
        color="primary"
        size="lg"
        tag={Link}
        to="/entries/new"
      >
        Add New Entry
      </Button>
      <ul className="list-unstyled">
        {data.map(entry => (
          <li key={entry.title}>
            <TILCard className="mb-3" title={entry.title} author={entry.author}>
              <NewLinesToParagraphs>{entry.body}</NewLinesToParagraphs>
            </TILCard>
          </li>
        ))}
      </ul>
    </>
  );
}
