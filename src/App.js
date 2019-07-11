import React from 'react';
import { Container } from 'reactstrap';
import MyNav from './MyNav';

function Header() {
  return (
    <header className="App-header">
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  );
}

function SkipNavLink({ skipId }) {
  return <a className="sr-only sr-only-focusable" href={`#${skipId}`}>Skip to content</a>;
}

function App() {
  return (
    <>
      <SkipNavLink skipId="main-content" />
      <MyNav />
      <Container>
        <Header />
        <main id="main-content">

        </main>
      </Container>
    </>
  );
}

export default App;
