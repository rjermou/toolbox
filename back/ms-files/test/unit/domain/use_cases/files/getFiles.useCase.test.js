/* eslint-env mocha */
/* global expect */
const proxyquire = require('proxyquire')

class GetFilesHttpClientMock {
  request () {
    return Object.assign({}, {
      data: {
        files: [
          'test1.csv',
          'test2.csv',
          'test3.csv',
          'test18.csv',
          'test4.csv',
          'test5.csv',
          'test6.csv',
          'test9.csv',
          'test15.csv'
        ]
      }
    })
  }
}

const GetFilesUseCaseMock =
    proxyquire('../../../../../src/domain/use_cases/files/getFiles.useCase', {
      '../../../../src/infrastructure/http_client/files_api/getFiles.httpClient': GetFilesHttpClientMock
    })

describe('Get Files Use Case', () => {
  describe('Get Files', () => {
    it('Should get a response with a list of files', async () => {
      const getFilesUseCaseMock = new GetFilesUseCaseMock()
      const response = await getFilesUseCaseMock.request()
      expect(response.data.files).to.be.an('array')
      expect(response.data.files[0]).to.be.equal('test1.csv')
    })
  })
})
