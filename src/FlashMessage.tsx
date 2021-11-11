import React from "react";
import { Location } from "@reach/router";
import { Alert } from "reactstrap";

type FlashMessageData = {
  color: string;
  message: string;
};

type FlashLocationState = { flashMessage?: FlashMessageData } | undefined;

export default function FlashMessage() {
  return (
    <Location>
      {({ location }) => {
        const state = location.state as FlashLocationState;

        if (!state || !state.flashMessage) return null;
        const { color, message } = state.flashMessage;

        return (
          <Alert color={color}>
            <i className="fa fa-check mr-1" aria-hidden="true" />
            {message}
          </Alert>
        );
      }}
    </Location>
  );
}
