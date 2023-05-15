/* eslint-env mocha */
/* global expect */
const proxyquire = require('proxyquire')

class GetFileDataHttpClientMock {
  request (fileName) {
    return Object.assign({}, {
      data: 'file,text,number,hex\ntest2.csv,knOdp\ntest2.csv,ZdEzrQdlnvrzqVJHFAfxMbS,38,b0767b4e1a0c4328b3eba6774a760ced'
    })
  }
}

const GetDataUseCaseMock =
    proxyquire('../../../../../src/domain/use_cases/files/getData.useCase', {
      '../../../../src/infrastructure/http_client/files_api/getFileData.httpClient': GetFileDataHttpClientMock
    })

describe('Get File Data Use Case', () => {
  describe('Get File Data', () => {
    it('Should get a response with file data without fileName parameter', async () => {
      const getDataUseCase = new GetDataUseCaseMock()
      const response = await getDataUseCase.request()
      expect(response.lines).to.be.an('array')
      expect(response.lines[0].number).to.be.equal('38')
    })
  })
})
