const express = require('express')
const appendFileAsync = require('./appendFile.js')
const changeFile = require('./fileChange.js')
const destroyLine = require('./destroyLine.js')
const fileRead = require('./fileRead.js')
const bodyParser = require('body-parser')

const inputPath = '/Users/anandujjwal/Desktop/UsingModules/sample.txt'
const app = express()
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser)

app.set('view engine', 'ejs')
app.post('/update', urlencodedParser, function (request, response) {
  if (!request.body) return response.sendStatus(500)
  let data = request.body.data
  let lineNumber = request.body.line
  let updateStatus = changeFile(inputPath, lineNumber, data)
  if (updateStatus === -1) {
    response.sendStatus(500)
  } else {
    response.redirect('/read')
  }
})

app.post('/destroy', function (request, response) {
  let lineNumber = request.body.line
  destroyLine(inputPath, lineNumber, (deleteStatus) => {
    if (deleteStatus === false) {
      response.sendStatus(500)
      return
    } else {
      response.redirect('/read')
    }
  })
})

app.get('/read', function (request, response) {
  fileRead(inputPath, (fileData) => {
    response.render('posts', {fileData})
  })
})

app.post('/write', function (request, response) {
  const textInput = '\n' + request.body.data

  appendFileAsync(inputPath, textInput)
    .then(() => {
      response.redirect('/read')
    })
    .catch((error) => {
      console.error(error)
    })
})

app.listen(8080)
