import React from 'react';
import { Router } from '@reach/router'
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
  React.useEffect(() => {
    document.title = 'Today We Learned';
  }, []);

  return (
    <>
      <Header />
      <TILCard />
    </>
  );
}

function NewEntryPage() {
  React.useEffect(() => {
    document.title = 'New TWL Entry';
  }, []);

  return <NewEntryForm />;
}

function App() {
  return (
    <>
      <SkipNavLink skipId="main-content" />
      <MyNav />
      <Container>
        <main id="main-content">
          <Router>
            <Index path="/" />
            <NewEntryPage path="/entries/new" />
          </Router>
        </main>
      </Container>
    </>
  );
}

export default App;
