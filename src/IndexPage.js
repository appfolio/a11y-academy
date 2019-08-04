import { Link } from "@reach/router";
import React from "react";
import { Button } from "reactstrap";
import TILCard from "./TILCard";

export default function IndexPage({ entries }) {
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
        {entries.map(entry => (
          <li key={entry.title}>
            <TILCard className="mb-3" title={entry.title} author={entry.author}>
              {entry.body}
            </TILCard>
          </li>
        ))}
      </ul>
    </>
  );
}
