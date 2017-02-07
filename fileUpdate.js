const express = require('express')
const appendFileAsync = require('./appendFile.js')
const changeFile = require('./fileChange.js')
const destroyLine = require('./destroyLine.js')
const bodyParser = require('body-parser')

const inputPath = '/Users/anandujjwal/Desktop/UsingModules/sample.txt'
const app = express()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.put('/update/:lineNumber', urlencodedParser, function (request, response) {
  if (!request.body) return response.sendStatus(500)
  let data = request.body.data
  let lineNumber = request.params.lineNumber
  let updateStatus = changeFile(inputPath, lineNumber, data)
  if (updateStatus === -1) {
    response.sendStatus(500)
  } else {
    response.send('update successful')
  }
})

app.delete('/destroy/:lineNumber', function (request, response) {
  let lineNumber = request.params.lineNumber
  destroyLine(inputPath, lineNumber, (deleteStatus) => {
    if (deleteStatus === false) {
      response.sendStatus(500)
      return
    } else {
      response.send('destroy successful')
    }
  })
})

app.get('/read', function (request, response) {
  response.sendFile(inputPath)
})

app.post('/write/:text', function (request, response) {
  const textInput = '\n' + request.params.text

  appendFileAsync(inputPath, textInput)
    .then(() => {
      response.send(`Succesfully added ${textInput} to the file`)
    })
    .catch((error) => {
      console.error(error)
    })
})

app.listen(8080)
