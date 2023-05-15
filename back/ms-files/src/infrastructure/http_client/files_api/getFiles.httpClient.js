const properties = require('getconfig')
const axios = require('axios')

class GetFilesHttpClient {
  getMethod () {
    return properties.services.filesAPI.getFiles.method
  }

  getURI () {
    return properties.services.filesAPI.getFiles.url
  }

  getTimeout () {
    return properties.services.filesAPI.getFiles.timeout
  }

  getHeaders () {
    return properties.services.filesAPI.getFiles.headers
  }

  async request () {
    const uri = this.getURI()
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

module.exports = GetFilesHttpClient
