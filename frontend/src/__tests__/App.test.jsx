import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders trading dashboard', () => {
  render(<App />);
  const dashboardElement = screen.getByText(/Trading Dashboard/i);
  expect(dashboardElement).toBeInTheDocument();
});