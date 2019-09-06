import { Link } from "react-router-dom";
import React from "react";
import {
  Alert,
  Button,
  ButtonToolbar,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  InputProps,
  Input,
  Label,
} from "reactstrap";
import type { NewEntry, NewEntryErrors } from "./sharedTypes";

type GroupedSelectInputProps = {
  groupedOptions: { group: string; options: string[] }[];
} & InputProps;

function GroupedSelectInput({
  id,
  label,
  groupedOptions,
  ...props
}: GroupedSelectInputProps) {
  return (
    <FormGroup>
      <span>{label}</span>
      <Input id={id} type="select" required {...props}>
        {groupedOptions.map(({ group, options }) => (
          <optgroup key={group} label={group}>
            {options.map((option) => (
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

function useInputState(initialState: string) {
  const [state, setState] = React.useState(initialState);
  return [
    state,
    React.useCallback(({ target: { value } }) => setState(value), [setState]),
  ] as const;
}

type ErrorBannerProps = {
  errorMessages: (string | null)[];
};

function ErrorBanner({ errorMessages }: ErrorBannerProps) {
  const messages = errorMessages.filter((e) => e);

  if (messages.length === 0) return null;

  return (
    <Alert color="danger">
      <p>
        {messages.length > 1
          ? `There were ${messages.length} problems with your form:`
          : "There was 1 problem with your form:"}
      </p>
      <ul>
        {messages.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>
    </Alert>
  );
}

export type NewEntryFormProps = {
  onSubmit: (entry: NewEntry) => Promise<NewEntryErrors>;
};

export default function NewEntryForm(props: NewEntryFormProps) {
  React.useEffect(() => {
    document.title = "New TWL Entry";
  }, []);

  const [errors, setErrors] = React.useState<NewEntryErrors>({});

  const [title, onTitleChange] = useInputState("");
  const [body, onBodyChange] = useInputState("");
  const [favoriteColor, onFavoriteColorChange] = useInputState("");
  const [team, onTeamChange] = useInputState("Dude, where's my Char?");

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // set flash message state if false
    props.onSubmit({ title, body, favoriteColor, team }).then((err) => {
      if (Object.values(err).some((v) => v)) setErrors(err);
    });
  };

  return (
    <Form onSubmit={onSubmit} noValidate>
      <h2>
        New <abbr title="Today We Learned">TWL</abbr> Entry
      </h2>
      <ErrorBanner errorMessages={Object.values(errors)} />

      <p>
        This form has way to much stuff for a simple app, but the point is to
        replicate a common APM pattern. Normally in React we'd use server side
        validations that get triggered on blur, but in this case we're going to
        emulate a common pattern of validating on submit.
      </p>

      <FormGroup>
        <Label>Title</Label>
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
        <Input
          id="new-entry-form-body"
          name="body"
          type="textarea"
          required
          placeholder="Today we learned..."
          onChange={onBodyChange}
          invalid={!!errors.body}
          value={body}
        />
        <FormFeedback>{errors.body}</FormFeedback>
      </FormGroup>

      <FormGroup tag="fieldset">
        <legend className="col-form-label">Pick your favorite color</legend>

        {["Blue", "Green", "Orange", "Yellow"].map((color) => {
          const id = `radio-color-${color}`;

          return (
            <FormGroup key={color} check>
              <Input
                checked={color === favoriteColor}
                id={id}
                invalid={!!errors.favoriteColor}
                name="color"
                onChange={onFavoriteColorChange}
                required
                type="radio"
                value={color}
              />

              <Label htmlFor={id} check>
                {color}
              </Label>
            </FormGroup>
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
          {
            group: "Curie",
            options: [
              "Dude, where's my Char?",
              "Error Bud",
              "The Printf Bride",
              "Concat in the Hat",
            ],
          },
          {
            group: "Copernicus",
            options: [
              "The Empire Strikes Backlog",
              "The Phantom Reference",
              "Force Push Awakens",
              "A Gnu Hope",
            ],
          },
        ]}
      />

      <ButtonToolbar>
        <Button color="primary" type="submit">
          Add New Entry
        </Button>
        <Button className="ms-2 text-decoration-none" tag={Link} to="/">
          Cancel
        </Button>
      </ButtonToolbar>
    </Form>
  );
}
