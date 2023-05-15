const getDataUseCase = new (
  require('../use_cases/files/getData.useCase'))()
const getFilesUseCase = new (
  require('../use_cases/files/getFiles.useCase'))()

class FilesService {
  async getFiles () {
    return await getFilesUseCase.request()
  }

  async getData (request) {
    let filesResponseData = null
    if (request == null) {
      filesResponseData = await getFilesUseCase.request()
    } else {
      filesResponseData = Object.assign({}, {
        data: {
          files: [request.fileName]
        }
      })
    }

    if (filesResponseData.data != null &&
            filesResponseData.data.files != null &&
            filesResponseData.data.files[0] != null) {
      let translatedResponseData = []
      for (const i in filesResponseData.data.files) {
        const responseData = await getDataUseCase
          .request(filesResponseData.data.files[i])
        if (responseData != null) {
          translatedResponseData = translatedResponseData.concat(responseData)
        }
      }

      return translatedResponseData
    } else {
      return Object.assign({}, {
        data: null
      })
    }
  }
}

module.exports = FilesService
