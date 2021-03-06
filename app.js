const express = require('express')
const todoApp = require('./sequelize.js')
const bodyParser = require('body-parser')
const app = express()
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('public'))

app.get('/', function (req, res) {
  res.render('../public/todo.html')
})

app.put('/update/:id', urlencodedParser, function (request, response) {
  if (request.params.id === '-1') {
    todoApp.updateAll().then((result) => {
      response.send('Successfully done')
    }).catch((err) => {
      console.log(err)
      response.sendStatus(500)
    })
  } else if (request.params.id === '-2') {
    todoApp.unSelectAll().then((result) => {
      response.send('Successfully done')
    }).catch((err) => {
      console.log(err)
      response.sendStatus(500)
    })
  }
  else {
    todoApp.update(request.params.id, request.body.description, request.body.status).then((result) => {
      if (result[1].rowCount === 0) {
        response.sendStatus(500)
        return
      }
      response.send('Successfully done')
    }).catch((err) => {
      console.log(err)
      response.sendStatus(500)
    })
  }
})

app.delete('/destroy/:id', function (request, response) {
  if (request.params.id === '-1') {
    todoApp.destroyCompleted().then((result) => {
      response.send('Successfully done')
    }).catch((err) => {
      console.log(err)
      response.sendStatus(500)
    })
  } else {
    todoApp.destroy(request.params.id).then((result) => {
      if (result[1].rowCount === 0) {
        response.sendStatus(500)
        return
      }
      response.send('Successfully done')
    }).catch((err) => {
      console.log(err)
      response.sendStatus(500)
    })
  }
})

app.get('/read', function (request, response) {
  todoApp.read().then((result) => {
    response.json(result[0])
  }).catch((err) => {
    console.log(err)
    response.sendStatus(500)
  })
})

app.post('/write/:description', function (request, response) {
  let description = request.params.description
  todoApp.insert(description).then((result) => {
    response.send(result[0])
  }).catch((err) => {
    console.log(err)
    response.sendStatus(500)
  })
})

app.listen(8080)

