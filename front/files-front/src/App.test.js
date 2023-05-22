import { render } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom'

jest.mock('./components/Navbar', () => () => <div data-testid="navbar"/>);
jest.mock('./components/Search', () => () => <div data-testid="search"/>);

describe('App component', () => {

  test('Navbar component to be in the App component', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId(/navbar/)).toBeInTheDocument();
  });

  test('Search component to be in the App component', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId(/search/)).toBeInTheDocument();
  });

});

