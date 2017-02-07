var fs = require('fs')

module.exports = function fileRead (filePath, callback) {
  fs.readFile(filePath, (err, fileData) => {
    if (err) throw err
    fileData = fileData.toString().split('\n')
    callback(fileData)
  })
}
