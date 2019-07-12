import React from 'react';
import { Button, Card, CardBody, CardText, CardTitle } from 'reactstrap';


// maybe make this an article? section?
export default function TILCard({ title, body }) {
  return (
    <Card body>
      <CardBody>
        <CardTitle tag="h2">{title}</CardTitle>
        <CardText>{body}</CardText>
        <Button>View More</Button>
      </CardBody>
    </Card>
  );
}

TILCard.defaultProps = {
  title: "TIL San Diego has the best office",
  body: "With supporting text below as a natural lead-in to additional content."
}
