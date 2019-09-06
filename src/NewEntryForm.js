import { Link } from "@reach/router";
import React from "react";
import {
  Alert,
  Button,
  ButtonToolbar,
  CustomInput,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label
} from "reactstrap";

function GroupedSelectInput({ id, label, groupedOptions, ...props }) {
  return (
    <FormGroup>
      <Label for={id}>{label}</Label>
      <Input id={id} type="select" required {...props}>
        {groupedOptions.map(({ group, options }) => (
          <optgroup key={group} label={group}>
            {options.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </optgroup>
        ))}
      </Input>
    </FormGroup>
  );
}

function useInputState(initialState) {
  const [state, setState] = React.useState(initialState);
  return [
    state,
    React.useCallback(({ target: { value } }) => setState(value), [setState])
  ];
}

function ErrorBanner({ errorMessages }) {
  const messages = errorMessages.filter(e => e);

  if (messages.length === 0) return null;

  return (
    <Alert color="danger">
      <p>There were {messages.length} problems with your form:</p>
      <ul>
        {messages.map(m => (
          <li key={m}>{m}</li>
        ))}
      </ul>
    </Alert>
  );
}

export default function NewEntryForm(props) {
  React.useEffect(() => {
    document.title = "New TWL Entry";
  }, []);

  const [errors, setErrors] = React.useState({
    title: null,
    body: null,
    favoriteColor: null,
    team: null
  });

  const [title, onTitleChange] = useInputState("");
  const [body, onBodyChange] = useInputState("");
  const [favoriteColor, onFavoriteColorChange] = useInputState("");
  const [team, onTeamChange] = useInputState("Dude, where's my Char?");

  const onSubmit = e => {
    e.preventDefault();
    // set flash message state if false
    props.onSubmit({ title, body, favoriteColor, team }).then(err => {
      if (Object.values(err).some(v => v)) setErrors(err);
    });
  };

  return (
    <Form onSubmit={onSubmit} noValidate>
      <h1>
        New <abbr title="Today We Learned">TWL</abbr> Entry
      </h1>
      <ErrorBanner errorMessages={Object.values(errors)} />

      <p>
        This form has way to much stuff for a simple app, but the point is to
        replicate a common APM pattern. Normally in React we'd use server side
        validations that get triggered on blur, but in this case we're going to
        emulate a common pattern of validating on submit.
      </p>

      <FormGroup>
        <Label htmlFor="new-entry-form-title">Title</Label>
        <Input
          id="new-entry-form-title"
          name="title"
          type="text"
          required
          onChange={onTitleChange}
          invalid={!!errors.title}
          value={title}
        />
        <FormFeedback>{errors.title}</FormFeedback>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="new-entry-form-body">Body</Label>
        <Input
          id="new-entry-form-body"
          name="body"
          type="textarea"
          required
          onChange={onBodyChange}
          invalid={!!errors.body}
          value={body}
        />
        <FormFeedback>{errors.body}</FormFeedback>
      </FormGroup>

      <FormGroup tag="fieldset">
        <legend className="col-form-label">Pick your favorite color</legend>

        {["Blue", "Green", "Orange", "Yellow"].map(color => {
          const id = `radio-color-${color}`;

          return (
            <CustomInput
              checked={color === favoriteColor}
              id={id}
              invalid={!!errors.favoriteColor}
              key={color}
              label={color}
              name="color"
              onChange={onFavoriteColorChange}
              required
              type="radio"
              value={color}
            />
          );
        })}
        <FormText color="danger">{errors.favoriteColor}</FormText>
      </FormGroup>

      <GroupedSelectInput
        id="new-entry-form-team"
        name="team"
        invalid={!!errors.team}
        onChange={onTeamChange}
        label="Pick your Team"
        value={team}
        groupedOptions={[
          { group: "Curie", options: ["Dude, where's my Char?", "Error Bud"] },
          {
            group: "Copernicus",
            options: [
              "The Empire Strikes Backlog",
              "The Phantom Reference",
              "Force Push Awakens"
            ]
          }
        ]}
      />

      <ButtonToolbar>
        <Button color="primary" type="submit">
          Add New Entry
        </Button>
        <Button className="ml-2 text-decoration-none" tag={Link} to="/">
          Cancel
        </Button>
      </ButtonToolbar>
    </Form>
  );
}
