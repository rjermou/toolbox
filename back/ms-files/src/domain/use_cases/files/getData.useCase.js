const getFileDataHttpClient =
    new (
      require('../../../infrastructure/http_client/files_api/getFileData.httpClient'))()

class FilesGetDataService {
  async request (fileName) {
    const responseData = await getFileDataHttpClient
      .request(fileName)
    const translatedResponseData =
            this.translateResponse(responseData, fileName)
    return translatedResponseData
  }

  translateResponse (res, fileName) {
    let r = null
    if (res.data != null) {
      const lines = res.data.split('\n')
      if (lines.length > 1) {
        const linesResponse = []
        for (let i = 1; i < lines.length; i++) {
          const items = lines[i].split(',')
          if (items.length === 4 &&
            this.textIsCorrect(items[1]) &&
            this.numIsCorrect(items[2]) &&
            this.hexIsCorrect(items[3])) {
            const element = Object.assign({}, {
              text: items[1],
              number: items[2],
              hex: items[3]
            })
            linesResponse.push(element)
          }
        }
        if (linesResponse.length !== 0) {
          r = Object.assign({}, {
            file: fileName,
            lines: linesResponse
          })
        }
      }
    }
    return r
  }

  textIsCorrect (text) {
    if (text !== null && text.trim() !== '') {
      return true
    }
    return false
  }

  numIsCorrect (num) {
    if (num !== null && num.trim() !== '' && !isNaN(num)) {
      return true
    }
    return false
  }

  hexIsCorrect (hex) {
    const hex32Pattern = '^[0-9a-fA-F]{32}$'
    if (hex !== null && hex.trim() !== '' && hex.match(hex32Pattern)) {
      return true
    }
    return false
  }
}

module.exports = FilesGetDataService
