import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'reactstrap';
import MyNav from './MyNav';
import NewEntryForm from './NewEntryForm';
import TILCard from './TILCard';

function Header() {
  return (
    <header className="App-header">
      <p>
        A bunch of write ups about something a team learned. Failure is ok as long as we learn from it!
      </p>
    </header>
  );
}

function SkipNavLink({ skipId }) {
  return <a className="sr-only sr-only-focusable" href={`#${skipId}`}>Skip to content</a>;
}

function Index() {
  return (
    <>
      <Header />
      <TILCard />
    </>
  );
}

function App() {
  return (
    <>
      <SkipNavLink skipId="main-content" />
      <Router>
        <MyNav />
        <Container>
          <main id="main-content">
            <Route exact path="/" component={Index} />
            <Route path="/entries/new" component={NewEntryForm} />
          </main>
        </Container>
      </Router>
    </>
  );
}

export default App;
