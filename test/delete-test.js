const request = require('request')
const chai = require('chai')
const expect = chai.expect
var options = {
  method: 'DELETE',
  url: 'http://localhost:8080/destroy/5',
  headers:
  {
    'postman-token': 'c5cddf8b-0898-e59a-6959-6af0a3f61243',
    'cache-control': 'no-cache',
    'content-type': 'application/x-www-form-urlencoded'
  },
  form: { data: 'anand' }
}

describe('DELETE REQUEST TO THE API', function () {
  it('Should delete task to the database when some id is provided', function (done) {
    request(options, function (error, response, body) {
      if (error) throw new Error(error)
      expect('Successfully done').to.eqls(body)
      done()
    })
  })
})
