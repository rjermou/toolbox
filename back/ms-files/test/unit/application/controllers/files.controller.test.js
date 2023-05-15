/* eslint-env mocha */
/* global expect */
const { mockReq } = require('sinon-express-mock')
const proxyquire = require('proxyquire')

class FakeResponse {
  statusCode = 200
  body = null
  status (s) { this.statusCode = s; return this }
  json (b) { this.body = b; return this }
}

class FilesServiceMock {
  getData (fileName) {
    return new Promise((resolve) => {
      resolve(Object.assign({}, [
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
      ]))
    })
  }

  getFiles () {
    return new Promise((resolve) => {
      resolve(Object.assign({}, {
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
      }))
    })
  }
}

class FilesRequestMock {
  constructor (data) {
    if (data && data.fileName && data.fileName !== 'test2csv') return data
    else {
      return {
        code: 'bad_request',
        message: 'Bad Request',
        severity: 'HIGH'
      }
    }
  }
}
const filesController =
    proxyquire('../../../../src/application/controllers/files.controller', {
      '../../../src/domain/services/files.service': FilesServiceMock,
      '../../../src/application/requests/files.request': FilesRequestMock
    })

describe('Files Controller', () => {
  describe('Get Files', () => {
    it('Should get a response with a list of files', async () => {
      const req = mockReq()
      const res = new FakeResponse()
      const response = await filesController.getFiles(req, res)
      expect(response.body.data.files).to.be.an('array')
      // expect(response.body.data.files).is.not.empty
    })
  })
  describe('Get File Data', () => {
    it('Should get a response with file data without fileName parameter', async () => {
      const req = mockReq()
      const res = new FakeResponse()
      const response = await filesController.getData(req, res)
      expect(response.body[0].lines).to.be.an('array')
      // expect(response.body[0].lines).is.not.empty
    })
    it('Should get a response with file data with fileName parameter', async () => {
      const req = mockReq({
        query: {
          fileName: 'test2.csv'
        }
      })
      const res = new FakeResponse()
      const response = await filesController.getData(req, res)
      expect(response.body[0].lines).to.be.an('array')
      // expect(response.body[0].lines).is.not.empty
    })
    it('Should get an error response due a bad formated fileName parameter', async () => {
      const req = mockReq({
        query: {
          fileName: 'test2csv'
        }
      })
      const res = new FakeResponse()
      const response = await filesController.getData(req, res)
      expect(response.statusCode).to.be.equal(400)
      expect(response.body).to.have.property('code', 'bad_request')
    })
  })
})
