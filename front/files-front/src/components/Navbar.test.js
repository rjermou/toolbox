import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import '@testing-library/jest-dom'

describe('Navbar component', () => {

  test('Navbar component to be in the App component', () => {
    render(<Navbar />);
    const filesDiv = screen.getByText('Files');
    expect(filesDiv).toBeInTheDocument();
  });

});