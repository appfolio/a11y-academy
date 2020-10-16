import { Link } from "@reach/router";
import React from "react";
import { Button, Jumbotron } from "reactstrap";
import TILCard from "./TILCard";

function BannerImage() {
  return (
    <Jumbotron>
      <img
        src="https://www.nps.gov/common/uploads/banner_image/pwr/homepage/F836E601-1DD8-B71B-0BC2936CDBC2FC26.jpg?width=2400&height=700&mode=crop&quality=90"
        alt="Joshua Tree"
        className="img-fluid"
      />
    </Jumbotron>
  );
}
export default function IndexPage({ entries }) {
  React.useEffect(() => {
    document.title = "Today We Learned";
  }, []);

  return (
    <>
      <header>
        <h1 data-testid="page-heading">Today We Learned</h1>
        <BannerImage />
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
        {entries.map((entry) => (
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
