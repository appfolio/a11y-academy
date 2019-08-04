import { Router } from "@reach/router";
import React from "react";
import { Container } from "reactstrap";
import FaqPage from "./FaqPage";
import IndexPage from "./IndexPage";
import MyNav from "./MyNav";
import NewEntryForm from "./NewEntryForm";
import data from "./seeddata";

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
          <Router>
            <IndexPage path="/" entries={entries} />
            <FaqPage path="/faqs" />
            <NewEntryForm path="/entries/new" />
          </Router>
        </main>
      </Container>
    </>
  );
}

export default App;
