import React from 'react';
import { Button, Card, CardBody, CardText, CardTitle } from 'reactstrap';


// maybe make this an article? section?
export default function TILCard({ title, children, className }) {
  return (
    <Card className={className}>
      <CardBody>
        <CardTitle tag="h2">{title}</CardTitle>
        <CardText>{children}</CardText>
        <Button>View More</Button>
      </CardBody>
    </Card>
  );
}

TILCard.defaultProps = {
  title: "TIL San Diego has the best office",
  body: "With supporting text below as a natural lead-in to additional content."
}
