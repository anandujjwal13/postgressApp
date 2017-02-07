var fs = require('fs')

module.exports = function destroyLine (filePath, lineNumber, callback) {
  let status = true
  fs.readFile(filePath, (err, fileData) => {
    if (err) throw err
    fileData = fileData.toString().split('\n')
    if (fileData.length > lineNumber) {
      status = true
      fileData.splice(lineNumber, 1)
      const text = fileData.join('\n')
      fs.writeFile(filePath, text, function (err) {
        if (err) return console.log(err)
      })
    } else {
      status = false
    }
    callback(status)
  })
}
