import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Search from './Search';
import { Provider } from 'react-redux';
import store from '../store/store';
import '@testing-library/jest-dom'

const test2fakeFilesList = [
    {
        fileName: 'test2.csv',
        hex: 'a82640c737707bf42c9ab7072736f7a9',
        number: '08567689271396872290941874741744',
        text: 'DMgBvTarWDyCNgqHOWnj'
    }
];
const fakeFilesList = [
  {
    fileName: 'test2.csv',
    hex: 'a82640c737707bf42c9ab7072736f7a9',
    number: '08567689271396872290941874741744',
    text: 'DMgBvTarWDyCNgqHOWnj'
  },
  {
      fileName: 'test3.csv',
      hex: 'a82640c737707bf42c9ab7072736f7a9',
      number: '08567689271396872290941874741744',
      text: 'DMgBvTarWDyCNgqHOWnj'
  }
];
jest.mock('../data/data',  () => ({
    getFilesData: (fileName) => {
      if (fileName === 'test2') {
        return Promise.resolve(test2fakeFilesList);
      } else {
        return Promise.resolve(fakeFilesList);
      }
    }
}));

describe('Search component', () => {

  test('Must show only one row in the table after type a fileName', async () => {
    render(<Provider store={store}>
     <Search />
    </Provider>);

    // just to the test the initial state
    const initialTable = await screen.findByRole('table', undefined, {timeout: 3000});
    const initialRows = await screen.findAllByRole('row', undefined, {timeout: 3000});
    expect(initialTable).toBeInTheDocument();
    expect(initialRows).toHaveLength(3); // 1th + 2tr

    // write in the filter
    const inputFileName = await screen.findByRole('textbox');
    act(()=> {
      userEvent.clear(inputFileName);
      userEvent.type(inputFileName, 'test2');
    });

    // Check the resulted state
    const resultedTable = await screen.findByRole('table', undefined, {timeout: 3000});
    const resultedRows = await screen.findAllByRole('row', undefined, {timeout: 3000});
    expect(resultedTable).toBeInTheDocument();
    expect(resultedRows).toHaveLength(2); // 1th + 1tr
  });

});