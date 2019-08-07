import React from "react";
import { Button, Card, CardBody, CardHeader, CardText } from "reactstrap";
import ShareModal from "./ShareModal";

function NewLinesToParagraphs({ children }) {
  // These shouldn't be reordered so the index should be a safe key.
  return children
    .trim()
    .split("\n")
    .map((str, idx) => <p key={idx}>{str}</p>);
}

// maybe make this an article? section?
export default function TILCard({ title, children, className }) {
  const [isShareModalOpen, setIsShareModalOpen] = React.useState(false);
  const toggleIsShareModalOpen = React.useCallback(
    () => setIsShareModalOpen(prevState => !prevState),
    [setIsShareModalOpen]
  );

  const onSubmit = () => {
    // TODO: wait, flash message
    toggleIsShareModalOpen();
  }
  return (
    <>
      <Card className={className}>
        <CardHeader tag="h2">{title}</CardHeader>
        <CardBody>
          <CardText tag="div">
            <NewLinesToParagraphs>{children}</NewLinesToParagraphs>
          </CardText>
          <Button className="p-0" color="link" onClick={toggleIsShareModalOpen}>
            <i className="fa fa-share-alt mr-1" aria-hidden="true" />
            Share
          </Button>
        </CardBody>
      </Card>
      <ShareModal
        onSubmit={onSubmit}
        isOpen={isShareModalOpen}
        toggle={toggleIsShareModalOpen}
      />
    </>
  );
}
