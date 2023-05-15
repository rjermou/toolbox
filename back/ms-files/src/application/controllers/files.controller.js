const FilesRequest = require(
  '../requests/files.request')

const FilesService = new (require(
  '../../domain/services/files.service')
)()

exports.getData = async (req, res) => {
  let requestData = null
  requestData = Object.assign({}, {
    fileName: req.query.fileName
  })
  let request = null
  if (requestData.fileName != null) {
    request = new FilesRequest(requestData)
    if (request.code === 'bad_request') {
      return res.status(400).json(request)
    }
  }
  const response =
        await FilesService.getData(request)

  return res.status(200).json(response)
}

exports.getFiles = async (req, res) => {
  const response =
        await FilesService.getFiles()

  return res.status(200).json(response)
}
