import React from 'react';
import { Button, ButtonToolbar, Col, Form, FormGroup, Input, Label } from 'reactstrap';


export default function NewEntryForm() {
  return (
    <Form>
      <h1>New TIL Entry</h1>

      <p>This form has way to much stuff for a simple app, but the point is to replicate a common APM pattern.</p>

      <FormGroup>
        <Label for="new-entry-form-title">Title</Label>
        <Input id="new-entry-form-title" type="text" />
      </FormGroup>

      <FormGroup>
        <Label for="new-entry-form-body">Body</Label>
        <Input id="new-entry-form-body" type="textarea" />
      </FormGroup>

      <FormGroup tag="fieldset" row>
        <legend>Pick your favorite color</legend>

        <Col sm={10}>
          <Label check for="new-entry-form-color-blue">
            <Input id="new-entry-form-color-blue" type="radio" />
              Blue
          </Label>
        </Col>
      </FormGroup>

      <ButtonToolbar>
        <Button color="primary" type="submit">Submit</Button>
        <Button className="ml-2">Cancel</Button>
      </ButtonToolbar>
    </Form>
  );
}
