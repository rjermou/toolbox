const properties = require('getconfig')
const axios = require('axios')

class GetFileDataHttpClient {
  getMethod () {
    return properties.services.filesAPI.getFileData.method
  }

  getURI () {
    return properties.services.filesAPI.getFileData.url
  }

  getTimeout () {
    return properties.services.filesAPI.getFileData.timeout
  }

  getHeaders () {
    return properties.services.filesAPI.getFileData.headers
  }

  async request (fileName) {
    const uri = this.getURI() + '/' + fileName
    const method = this.getMethod()
    const timeout = this.getTimeout()
    const headers = this.getHeaders()
    let res = null
    await axios({
      method,
      url: uri,
      headers,
      timeout
    }).then(function (response) {
      res = response
    }).catch((error) => {
      res = Object.assign({}, {
        data: null
      })
      this.handleError(error)
    })
    return res
  }

  handleError (error) {
    const e = Object.assign({}, {
      code: error.code,
      message: error.message,
      detail: error.response.data.message,
      status: error.response.status,
      statusText: error.response.statusText,
      requestTo: error.request.path
    })
    console.error(e)
  }
}

module.exports = GetFileDataHttpClient
