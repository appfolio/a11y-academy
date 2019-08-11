import { Router, Location } from "@reach/router";
import React from "react";
import { Container } from "reactstrap";
import FaqPage from "./FaqPage";
import FlashMessage from "./FlashMessage";
import IndexPage from "./IndexPage";
import MyNav from "./MyNav";
import NewEntryForm from "./NewEntryForm";
import ShowPage from "./ShowPage";
import data from "./seeddata";


function SkipNavLink({ skipId }) {
  return (
    <a className="sr-only sr-only-focusable" href={`#${skipId}`}>
      Skip to content
    </a>
  );
}

function App({ location, navigate }) {
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

  const [entries] = React.useState(data);

  return (
    <>
      <SkipNavLink skipId="main-content" />
      <MyNav />
      <Container>
        <main id="main-content">
          <FlashMessage />
          <Router location={location}>
            <IndexPage path="/" entries={entries} />
            <FaqPage path="/faqs" />
            <NewEntryForm path="/entries/new" onSubmit={onSubmit} />
            <ShowPage entries={entries} path="/entries/:title" />
          </Router>
        </main>
      </Container>
    </>
  );
}

// this component exists as a hack due to a bug in testing reach router
function MyLocationWrapper() {
  return (
    <Location>
      {({ location, navigate }) => (
        <App location={location} navigate={navigate} />
      )}
    </Location>
  );
}

export default MyLocationWrapper;
