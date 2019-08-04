import React from "react";
import { Location } from "@reach/router";
import { Alert } from "reactstrap";

// TODO: show icon based on success/failure
export default function FlashMessage() {
  return (
    <Location>
      {({ location: { state } }) => {
        if (!state || !state.flashMessage) return null;
        const { color, message } = state.flashMessage;

        return <Alert color={color}>{message}</Alert>;
      }}
    </Location>
  );
}
