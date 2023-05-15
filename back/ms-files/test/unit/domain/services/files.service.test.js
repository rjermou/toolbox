/* eslint-env mocha */
/* global expect */
const proxyquire = require('proxyquire')

class GetFilesUseCaseMock {
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

class GetDataUseCaseMock {
  request (fileName) {
    return Object.assign({}, [
      {
        file: fileName,
        lines: [
          {
            text: 'QEOsZjLsnYRXZrTUJAYBLxvVYH',
            number: '8185764',
            hex: '1a8db5efefe0a7bc645e0f40ca8e843d'
          }
        ]
      }
    ])
  }
}

const FilesServiceMock =
    proxyquire('../../../../src/domain/services/files.service', {
      '../../../src/domain/use_cases/files/getData.useCase': GetDataUseCaseMock,
      '../../../src/domain/use_cases/files/getFiles.useCase': GetFilesUseCaseMock
    })

describe('Files Service', () => {
  describe('Get Files', () => {
    it('Should get a response with a list of files', async () => {
      const filesService = new FilesServiceMock()
      const response = await filesService.getFiles()
      expect(response.data.files).to.be.an('array')
      expect(response.data.files[0]).to.be.equal('test1.csv')
    })
  })
  describe('Get File Data', () => {
    it('Should get a response with file data without fileName parameter', async () => {
      const filesService = new FilesServiceMock()
      const response = await filesService.getData()
      expect(response).to.be.an('array')
    })
    it('Should get a response with file data with fileName parameter', async () => {
      const req = { fileName: 'test2.csv' }
      const filesService = new FilesServiceMock()
      const response = await filesService.getData(req)
      expect(response).to.be.an('array')
    })
  })
})
