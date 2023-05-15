/* eslint-env mocha */
/* global expect */
const sinon = require('sinon')
const proxyquire = require('proxyquire')

describe('Http Client Of Get Files', async () => {
  it('Should get a response with file\'s list', async () => {
    const getConfigMock = Object.assign({}, {
      services: {
        filesAPI: {
          getFiles: {
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
    const GetFilesHttpClient = proxyquire('../../../../../src/infrastructure/http_client/files_api/getFiles.httpClient', {
      getconfig: getConfigMock,
      axios: axiosStub
    })
    const response = await (new GetFilesHttpClient()).request()
    expect(response.data.files[0]).to.be.eql('test1.csv')
  })

  it('Should get an error response', async () => {
    const getConfigMock = Object.assign({}, {
      services: {
        filesAPI: {
          getFiles: {
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
        path: '/v1/secret/files'
      }

    })
    const GetFilesHttpClient = proxyquire('../../../../../src/infrastructure/http_client/files_api/getFiles.httpClient', {
      getconfig: getConfigMock,
      axios: axiosStub
    })
    const response = await (new GetFilesHttpClient()).request()
    expect(response.data).to.be.eq(null)
  })
})
