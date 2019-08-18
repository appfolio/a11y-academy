import React from "react";
import { Link } from "@reach/router";
import { Card, CardBody, CardHeader, CardText } from "reactstrap";
import ShareButton from "./ShareButton";

function PreviewText({ children }) {
  return children.trim().split("\n")[0] + "..";
}

// maybe make this an article? section?
export default function TILCard({ title, children, className }) {
  const encodedTitle = encodeURIComponent(title);

  return (
    <Card className={className}>
      <CardHeader tag="h2">
        <Link to={`/entries/${encodedTitle}`}>{title}</Link>
      </CardHeader>
      <CardBody>
        <CardText tag="div" className="pb-2">
          <PreviewText>{children}</PreviewText>
        </CardText>
        <ShareButton />
      </CardBody>
    </Card>
  );
}
