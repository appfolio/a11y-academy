import React from "react";
import {
  Alert,
  Button,
  ButtonProps,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalProps,
  UncontrolledTooltip,
} from "reactstrap";

type ButtonWithTooltipProps = {
  toolTipText: string;
} & ButtonProps;

function ButtonWithTooltip({
  children,
  disabled,
  toolTipText,
  ...props
}: ButtonWithTooltipProps) {
  // TODO: use useId here in react 18
  const targetId = "button-with-tooltip-target";
  const tooltipId = "tooltip-for-disabled-button";

  if (!disabled) return <Button {...props}>{children}</Button>;

  return (
    // Note we don't need a title attribute due to visible text from tooltip
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <span
      id={targetId}
      data-testid="button-with-tooltip-target"
      style={{ cursor: "not-allowed" }}
    >
      <Button aria-describedby={tooltipId} disabled {...props}>
        {children}
      </Button>
      <UncontrolledTooltip id={tooltipId} target={targetId}>
        <span>{toolTipText}</span>
      </UncontrolledTooltip>
    </span>
  );
}

const ShareModalHeader = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"h3">) => <h5 {...props}>{children}</h5>;

type ShareModalProps = Omit<ModalProps, "onSubmit"> & {
  onSubmit: (email: string) => void;
  toggle: () => void;
};

function ShareModal({ onSubmit, ...props }: ShareModalProps) {
  const [email, setEmail] = React.useState("");
  const isEmailValid = /\S+@\S+\.\S+/.test(email);

  return (
    <Modal {...props}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(email);
        }}
      >
        <ModalHeader tag={ShareModalHeader} toggle={props.toggle}>
          Share Today We Learned
        </ModalHeader>
        <ModalBody>
          <p>
            This Modal doesn't actually share anything lol. Note that focus is
            trapped inside of the modal - we can't tab outside of it. Also note
            the focus switch back to the original share button when the modal
            closes.
          </p>
          <FormGroup>
            <Input
              type="email"
              id="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="first.last@example.com"
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <ButtonWithTooltip
            type="submit"
            color="primary"
            disabled={!isEmailValid}
            toolTipText="You must enter a valid email address"
          >
            Share TWL Entry
          </ButtonWithTooltip>
        </ModalFooter>
      </Form>
    </Modal>
  );
}

function SuccessFlashMessage({ email }: { email: string }) {
  return (
    <Alert color="success">
      <i className="fa fa-check me-1" aria-hidden="true" />
      Successfully shared article with {email}
    </Alert>
  );
}

export default function ShareButton() {
  const [isShareModalOpen, setIsShareModalOpen] = React.useState(false);
  const toggleIsShareModalOpen = React.useCallback(
    () => setIsShareModalOpen((prevState) => !prevState),
    [setIsShareModalOpen]
  );

  const [submittedEmail, setSubmittedEmail] = React.useState("");
  const onSubmit = (email: string) => {
    toggleIsShareModalOpen();
    setSubmittedEmail(email);
  };

  return (
    <>
      {submittedEmail && <SuccessFlashMessage email={submittedEmail} />}
      <Button className="p-0" color="link" onClick={toggleIsShareModalOpen}>
        <i className="fa fa-share-alt me-1" aria-hidden="true" />
        Share
      </Button>
      <ShareModal
        onSubmit={onSubmit}
        isOpen={isShareModalOpen}
        toggle={toggleIsShareModalOpen}
      />
    </>
  );
}
