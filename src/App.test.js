import { cleanup, render } from '@testing-library/react';
import axe from 'axe-core';
import React from 'react';
import App from './App';

describe('App', () => {
  afterEach(cleanup);

  it('doesnt have any accessibility violations', async () => {
    const { container } = render(<App />);
    const { violations } = await axe.run(container);
    expect(violations).toEqual([]);
  });
});
