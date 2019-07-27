import React from 'react';
import { Link } from '@reach/router';
import { Button, ButtonToolbar, Form, FormGroup, Input, Label } from 'reactstrap';


function RadioInput({ name, label }) {
  return (
    <FormGroup check>
      <Label check>
        <Input name={name} type="radio" required />
        {label}
      </Label>
    </FormGroup>
  );
}

function GroupedSelectInput({ id, label, groupedOptions }) {
  return (
    <FormGroup>
      <Label for={id}>{label}</Label>
      <Input id={id} type="select" required>
        {groupedOptions.map(({ group, options }) => (
          <optgroup label={group}>
            {options.map(option => <option value={option}>{option}</option>)}
          </optgroup>
        ))}

      </Input>
    </FormGroup>
  );
}

export default function NewEntryForm() {
  React.useEffect(() => {
    document.title = 'New TWL Entry';
  }, []);

  return (
    <Form>
      <h1>New <abbr title="Today We Learned">TWL</abbr> Entry</h1>

      <p>This form has way to much stuff for a simple app, but the point is to replicate a common APM pattern.</p>

      <FormGroup>
        <Label for="new-entry-form-title">Title</Label>
        <Input id="new-entry-form-title" type="text" required />
      </FormGroup>

      <FormGroup>
        <Label for="new-entry-form-body">Body</Label>
        <Input id="new-entry-form-body" type="textarea" required />
      </FormGroup>

      <FormGroup tag="fieldset">
        <legend className="col-form-label">Pick your favorite color</legend>

        {['Blue', 'Green', 'Orange', 'Yellow'].map(color => <RadioInput name="favorite-color" label={color} />)}
      </FormGroup>

      <GroupedSelectInput
        id="new-entry-form-team"
        label="Pick your Team"
        groupedOptions={[
          { group: 'Curie', options: ["Dude, where's my Char?", 'Error Bud'] },
          { group: 'Copernicus', options: ['The Empire Strikes Backlog', 'The Phantom Reference', 'Force Push Awakens']}
        ]}
      />

      <ButtonToolbar>
        <Button color="primary" type="submit">Submit</Button>
        <Button className="ml-2 text-decoration-none" tag={Link} to="/">Cancel</Button>
      </ButtonToolbar>
    </Form>
  );
}
