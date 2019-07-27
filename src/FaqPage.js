import React from 'react';
import { Collapse } from 'reactstrap';

const faqs = [
  {
    "question": "What's this for?",
    "answer": "A bunch of write ups about something a team learned. Failure is ok as long as we learn from it!"
  },
  {
    "question": "What's your favorite color?",
    "answer": "Green, obviously"
  },
  {
    "question": "What's Soulja Boy's best song?",
    "answer": "Of course it's Kiss Me Thru The Phone"
  },
  {
    "question": "Is Ted Cruz the Zodiac Killer?",
    "answer": "duh"
  },
]

const style = {
  background: 'none',
  border: 'none',
  color: 'inherit',
  cursor: 'pointer',
  font: 'inherit',
  padding: 0
}

const Emoji = props => (
  <span role="img" aria-label={props.label} {...props}>
    {props.symbol}
    {props.children}
  </span>
);

const Arrow = props => props.isOpen ?
  <span {...props} role="img" aria-label="down arrow" >⬇️</span> :
  <span {...props} role="img" aria-label="right arrow" >➡️</span>

function FAQ({ question, answer }) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div>
        <button style={style} onClick={() => setIsOpen(prevState => !prevState)}>
          <h2 className="h5"><Arrow className="mr-1" isOpen={isOpen} />{question}</h2>
        </button>
        <Collapse isOpen={isOpen}>
          {answer}
        </Collapse>
      </div>
    );
}

function ExternalLink({ href, children, ...props }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function FaqList({ faqs }) {
  // TODO: MAKE THIS A LIST
  return faqs.map(faq => <FAQ key={faq.question} question={faq.question} answer={faq.answer} />)
}

export default function FaqPage() {
  React.useEffect(() => {
    document.title = 'Frequently Asked Questions';
  }, []);

  return (
    <>
      <h1>Frequently Asked Questions</h1>
      <p>
        For such a short list we'd probably just show all the questions and
        answers instead of hiding each behind a <ExternalLink href="https://www.w3.org/TR/wai-aria-practices-1.1/#disclosure">
        disclosure</ExternalLink> component.
      </p>
      <FaqList faqs={faqs} />
    </>
  );
}
