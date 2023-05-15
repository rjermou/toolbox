/* eslint-env mocha */
/* global expect */
const sinon = require('sinon')
const proxyquire = require('proxyquire')

describe('Http Client Of Get File Data', async () => {
  it('Should get a response with the file\'s data', async () => {
    const getConfigMock = Object.assign({}, {
      services: {
        filesAPI: {
          getFileData: {
            method: 'get',
            url: 'url',
            timeout: 6000,
            headers: {
              Accept: 'application/json',
              Authorization: 'Bearer token'
            }
          }
        }
      }
    })
    const axiosStub = sinon.stub().resolves({
      status: 200,
      data: 'file,text,number,hex\ntest2.csv,knOdp\ntest2.csv,ZdEzrQdlnvrzqVJHFAfxMbS,38,b0767b4e1a0c4328b3eba6774a760ced'
    })
    const GetFileDataHttpClient = proxyquire('../../../../../src/infrastructure/http_client/files_api/getFileData.httpClient', {
      getconfig: getConfigMock,
      axios: axiosStub
    })
    const response = await (new GetFileDataHttpClient()).request()
    expect(response.data.split('\n')[1]).to.be.eql('test2.csv,knOdp')
  })

  it('Should get an error response', async () => {
    const getConfigMock = Object.assign({}, {
      services: {
        filesAPI: {
          getFileData: {
            method: 'get',
            url: 'url',
            timeout: 6000,
            headers: {
              Accept: 'application/json',
              Authorization: 'Bearer token'
            }
          }
        }
      }
    })
    const axiosStub = sinon.stub().rejects({
      status: 401,
      code: 'ERR_BAD_REQUEST',
      message: 'Request failed with status code 401',
      response: {
        data: {
          message: 'API KEY is required'
        },
        status: 401,
        statusText: 'Unauthorized'
      },
      request: {
        path: '/v1/secret/file/test14.csv'
      }

    })
    const GetFileDataHttpClient = proxyquire('../../../../../src/infrastructure/http_client/files_api/getFileData.httpClient', {
      getconfig: getConfigMock,
      axios: axiosStub
    })
    const response = await (new GetFileDataHttpClient()).request()
    expect(response.data).to.be.eq(null)
  })
})
