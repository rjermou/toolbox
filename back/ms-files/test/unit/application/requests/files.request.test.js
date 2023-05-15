/* eslint-env mocha */
/* global expect */
const proxyquire = require('proxyquire')

const filesErrorsMock = {
  bad_request: {
    code: 'bad_request',
    message: 'Bad Request',
    severity: 'HIGH'
  }
}

const FilesRequest =
    proxyquire('../../../../src/application/requests/files.request', {
      '../../../src/application/dictionaries/errors/files.error.json': filesErrorsMock
    })

describe('Files Request', () => {
  it('Should respond successfully with a correct fileName', async () => {
    const req = {
      fileName: 'test2.csv'
    }
    const res = new FilesRequest(req)

    expect(res).to.be.equal(req)
  })

  it('Should respond an error with incorrect fileName', async () => {
    try {
      const req = {
        fileName: 'test2csv'
      }
      const res = new FilesRequest(req)
      return res
    } catch (error) {
      expect(error).to.have.property('code', 'bad_request')
    }
  })
})
