const getFilesHttpClient =
    new (
      require('../../../infrastructure/http_client/files_api/getFiles.httpClient'))()

class FilesGetFilesService {
  async request () {
    const responseData = await getFilesHttpClient
      .request()
    const translatedResponseData =
            this.translateResponse(responseData)
    return translatedResponseData
  }

  translateResponse (res) {
    return Object.assign({}, {
      data: res.data
    })
  }
}

module.exports = FilesGetFilesService
