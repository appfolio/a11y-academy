import { Alert } from "reactstrap";
import { useLocation } from "react-router";

type FlashMessageData = {
  color: string;
  message: string;
};

type FlashLocationState = { flashMessage?: FlashMessageData } | undefined;

export default function FlashMessage() {
  const location = useLocation();

  const state = location.state as FlashLocationState;

  if (!state || !state.flashMessage) return null;
  const { color, message } = state.flashMessage;

  return (
    <Alert color={color}>
      <i className="fa fa-check me-1" aria-hidden="true" />
      {message}
    </Alert>
  );
}
