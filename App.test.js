// src/App.test.js

import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders TV Shows heading', () => {
  const { getByText } = render(<App />);
  const headingElement = getByText(/TV Shows/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders at least one show card', () => {
  const { getAllByTestId } = render(<App />);
  const showCards = getAllByTestId('show-card');
  expect(showCards.length).toBeGreaterThan(0);
});
