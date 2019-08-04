import { navigate, Router } from "@reach/router";
import React from "react";
import { Container } from "reactstrap";
import FaqPage from "./FaqPage";
import FlashMessage from "./FlashMessage";
import IndexPage from "./IndexPage";
import MyNav from "./MyNav";
import NewEntryForm from "./NewEntryForm";
import data from "./seeddata";

const onSubmit = async data => {
  const { title, body, favoriteColor, team } = data;

  const errors = {
    title: title.length > 0 ? null : "You must enter a title",
    body: body.length > 0 ? null : "You must enter a body",
    favoriteColor: favoriteColor ? null : "You must enter a color",
    team: team ? null : "You must enter a team"
  };

  if (!(errors.title || errors.body || errors.favoriteColor || errors.team)) {
    await navigate("/", {
      state: {
        flashMessage: {
          color: "success",
          message: "Successfully added new entry"
        }
      }
    });
  }
  return errors;
};

function SkipNavLink({ skipId }) {
  return (
    <a className="sr-only sr-only-focusable" href={`#${skipId}`}>
      Skip to content
    </a>
  );
}

function App() {
  const [entries] = React.useState(data);

  return (
    <>
      <SkipNavLink skipId="main-content" />
      <MyNav />
      <Container>
        <main id="main-content">
          <FlashMessage />
          <Router>
            <IndexPage path="/" entries={entries} />
            <FaqPage path="/faqs" />
            <NewEntryForm path="/entries/new" onSubmit={onSubmit} />
          </Router>
        </main>
      </Container>
    </>
  );
}

export default App;
