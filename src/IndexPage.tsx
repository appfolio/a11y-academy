import { Link } from "react-router-dom";
import React from "react";
import { Button } from "reactstrap";
import TILCard from "./TILCard";
import type { Entry } from "./sharedTypes";

function Jumbotron(props: { children: React.ReactElement }) {
  return (
    <div className="p-5 mb-4 bg-light rounded-3">
      <div className="container-fluid py-5">{props.children}</div>
    </div>
  );
}

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

type IndexPageProps = {
  entries: Entry[];
};

export default function IndexPage({ entries }: IndexPageProps) {
  React.useEffect(() => {
    document.title = "Today We Learned";
  }, []);

  return (
    <>
      <header>
        <h1>Today We Learned</h1>
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
            <TILCard className="mb-3" title={entry.title}>
              {entry.body}
            </TILCard>
          </li>
        ))}
      </ul>
    </>
  );
}
