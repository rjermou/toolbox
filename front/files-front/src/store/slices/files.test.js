import files, { setFilesList } from './files'

describe('files slice', () => {

    test('Should return the initial state', () => {
      const initialState = {
        data: {
          list: [],
          filter: null
        }
      };
      expect(files(undefined, {type: undefined})).toEqual(initialState);
    });

    test('Should return the new state', () => {
        const initialState = {
          data: {
            list: [],
            filter: null
          }
        };
        const newState = {
              list: [
                {
                    fileName: 'test2.csv',
                    hex: 'a82640c737707bf42c9ab7072736f7a9',
                    number: '08567689271396872290941874741744',
                    text: 'DMgBvTarWDyCNgqHOWnj'
                }
              ],
              filter: "test2"
        };
        const r = { data: newState };

        expect(files(initialState, setFilesList(newState))).toEqual(r);
      });

});
