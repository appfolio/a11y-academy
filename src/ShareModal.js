import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledTooltip
} from "reactstrap";

function ButtonWithTooltip({ children, disabled, toolTipText, ...props }) {
  const targetId = "button-with-tooltip-target";

  return (
    // Note we don't need a title attribute due to visible text
    <span id={targetId} className="d-inline-block" tabIndex={disabled ? 0 : -1}>
      <Button
        style={{ pointerEvents: disabled ? "none" : "inherit" }}
        disabled={disabled}
        {...props}
      >
        {children}
      </Button>
      {disabled && (
        <UncontrolledTooltip target={targetId}>
          {toolTipText}
        </UncontrolledTooltip>
      )}
    </span>
  );
}

const ShareModalHeader = ({ children, className, ...props }) => (
  <h3 className={`h5 ${className}`} {...props}>
    {children}
  </h3>
);

export default function ShareModal({ onSubmit, ...props }) {
  const [email, setEmail] = React.useState("");
  const isEmailValid = /\S+@\S+\.\S+/.test(email);

  return (
    <Modal {...props}>
      <Form
        onSubmit={e => {
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
            <Label htmlFor="email-input">Email</Label>
            <Input
              type="email"
              id="email-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
