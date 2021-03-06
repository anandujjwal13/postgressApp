const request = require('request')
const chai = require('chai')
const expect = chai.expect

const options = {
  method: 'PUT',
  url: 'http://localhost:8080/update/5',
  headers:
  {
    'postman-token': '242c3def-2c02-2abf-1ec0-abb0b683cf04',
    'cache-control': 'no-cache',
    'content-type': 'application/x-www-form-urlencoded'
  },
  form: { description: 'kill manav', status: 'true' }
}

describe('PUT REQUEST TO THE API', function () {
  it('Should UPDATE task to the database when id of task is provided', function (done) {
    request(options, function (error, response, body) {
      if (error) throw new Error(error)
      expect('Successfully done').to.eqls(body)
      done()
    })
  })
})
