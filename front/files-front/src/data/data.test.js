import axios from 'axios';
import { getFilesData } from "./data";

jest.mock("axios");

describe("Data Service", () => {

    let response = {};
    let r = [];
    beforeEach(() => {
        response = {
            data: [
                {
                    file: 'test2.csv',
                    lines: [
                        {
                            text: 'DMgBvTarWDyCNgqHOWnj',
                            number: '08567689271396872290941874741744',
                            hex: 'a82640c737707bf42c9ab7072736f7a9'
                        }
                    ]
                }
            ]
        };
        axios.mockImplementation(() => Promise.resolve(response));
        r =  [
            {
                fileName: 'test2.csv',
                hex: 'a82640c737707bf42c9ab7072736f7a9',
                number: '08567689271396872290941874741744',
                text: 'DMgBvTarWDyCNgqHOWnj'
            }
        ];
    });

    test('getFilesData with a fileName parameter: ', async () => {
        const result = await getFilesData('test2');
        expect(result).toEqual(r);
    });

    test('getFilesData without fileName parameter: ', async () => {
        const result = await getFilesData();
        expect(result).toEqual(r);
    });

    test('getFilesData without fileName parameter with Exception: ', async () => {
        const error = {message: 'Network Error', name: 'AxiosError', code: 'ERR_NETWORK'}
        axios.mockImplementation(() => Promise.reject(error));
        const result = await getFilesData();
        expect(result).toEqual([]);
    });


});