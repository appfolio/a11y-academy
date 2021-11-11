import { RouteComponentProps } from "@reach/router";
import React from "react";
import { Collapse } from "reactstrap";

const faqs = [
  {
    question: "What's this for?",
    answer:
      "A bunch of write ups about something a team learned. Failure is ok as long as we learn from it!",
  },
  {
    question: "What's your favorite color?",
    answer: "Green, obviously",
  },
  {
    question: "What's Soulja Boy's best song?",
    answer: "Of course it's Kiss Me Thru The Phone",
  },
  {
    question: "Is Ted Cruz the Zodiac Killer?",
    answer: "duh",
  },
];

const style = {
  background: "none",
  border: "none",
  color: "inherit",
  cursor: "pointer",
  font: "inherit",
  padding: 0,
};

type ArrowProps = {
  isOpen: boolean;
} & React.ComponentPropsWithoutRef<"span">;

const Arrow = ({ isOpen, ...props }: ArrowProps) =>
  isOpen ? (
    <span {...props} role="img" aria-label="down arrow">
      ⬇️
    </span>
  ) : (
    <span {...props} role="img" aria-label="right arrow">
      ➡️
    </span>
  );

type FAQProps = {
  question: string;
  answer: string;
};

function FAQ({ question, answer }: FAQProps) {
  const [isOpen, setIsOpen] = React.useState(true);
  // Note that there is a details and summary component,
  // but Edge doesn't have support and no way to animate
  // transitions. Default cursor is wrong too.

  return (
    <>
      <dt>
        <button
          style={style}
          className="border border-primary rounded-top bg-light d-block w-100"
          onClick={() => setIsOpen((prevState) => !prevState)}
          aria-expanded={isOpen}
        >
          <h2 className="h5 p-3 mb-0 text-start">
            <Arrow className="me-2" isOpen={isOpen} />
            {question}
          </h2>
        </button>
      </dt>
      <dd className="mb-4">
        <Collapse isOpen={isOpen}>
          <div className="bg-white border rounded-bottom">
            <div className="p-2 pb-3">{answer}</div>
          </div>
        </Collapse>
      </dd>
    </>
  );
}

function ExternalLink({
  href,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"a">) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function FaqList({ faqs }: { faqs: FAQProps[] }) {
  return (
    <dl>
      {faqs.map((faq) => (
        <FAQ key={faq.question} question={faq.question} answer={faq.answer} />
      ))}
    </dl>
  );
}

export default function FaqPage(_props: RouteComponentProps) {
  React.useEffect(() => {
    document.title = "Frequently Asked Questions";
  }, []);

  return (
    <>
      <h1>Frequently Asked Questions</h1>
      <p>
        For such a short list we'd probably just show all the questions and
        answers instead of hiding each behind a{" "}
        <ExternalLink href="https://www.w3.org/TR/wai-aria-practices-1.1/#disclosure">
          disclosure
        </ExternalLink>{" "}
        component.
      </p>
      <FaqList faqs={faqs} />
    </>
  );
}
