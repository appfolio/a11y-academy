import React from "react";
import { Link } from "@reach/router";
import { Card, CardBody, CardHeader, CardText } from "reactstrap";
import ShareButton from "./ShareButton";

function NewLinesToParagraphs({ children }) {
  // These shouldn't be reordered so the index should be a safe key.
  return children
    .trim()
    .split("\n")
    .map((str, idx) => <p key={idx}>{str}</p>);
}

// maybe make this an article? section?
export default function TILCard({ title, children, className }) {
  const onSubmit = () => {
    // TODO: wait, flash message
    return Promise.resolve();
  };
  const encodedTitle = encodeURIComponent(title);

  return (
    <Card className={className}>
      <CardHeader tag="h2">
        <Link to={`/entries/${encodedTitle}`}>{title}</Link>
      </CardHeader>
      <CardBody>
        <CardText tag="div">
          <NewLinesToParagraphs>{children}</NewLinesToParagraphs>
        </CardText>
        <ShareButton onSubmit={onSubmit} />
      </CardBody>
    </Card>
  );
}
