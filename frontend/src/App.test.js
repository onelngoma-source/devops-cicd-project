import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('axios');

describe('App Component', () => {
  test('renders header', () => {
    render(<App />);
    const headerElement = screen.getByText(/DevOps CI\/CD Dashboard/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders form', () => {
    render(<App />);
    const nameLabel = screen.getByText(/Nom/i);
    expect(nameLabel).toBeInTheDocument();
  });
});
