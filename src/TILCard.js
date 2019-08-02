import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

function NewLinesToParagraphs({ children }) {
  // These shouldn't be reordered so the index should be a safe key.
  return children
    .trim()
    .split("\n")
    .map((str, idx) => <p key={idx}>{str}</p>);
}

const ShareModalHeader = ({ children, className, ...props }) => (
  <h3 className={`h5 ${className}`} {...props}>
    {children}
  </h3>
);

function ShareModal({ ...props }) {
  return (
    <Modal {...props}>
      <ModalHeader tag={ShareModalHeader} toggle={props.toggle}>
        Share TIL
      </ModalHeader>
      <ModalBody>
        This Modal doesn't actually share anything lol. Note that focus is
        trapped inside of the modal - we can't tab outside of it. Also note the
        focus switch back to the original share button when the modal closes.
      </ModalBody>
      <ModalFooter>
        <Button color="primary">Share</Button>
      </ModalFooter>
    </Modal>
  );
}

// maybe make this an article? section?
export default function TILCard({ title, children, className }) {
  const [isShareModalOpen, setIsShareModalOpen] = React.useState(false);
  const toggleIsShareModalOpen = React.useCallback(
    () => setIsShareModalOpen(prevState => !prevState),
    [setIsShareModalOpen]
  );
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
      <ShareModal isOpen={isShareModalOpen} toggle={toggleIsShareModalOpen} />
    </>
  );
}
