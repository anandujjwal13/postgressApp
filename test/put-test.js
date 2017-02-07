const request = require('request')
const chai = require('chai')
const expect = chai.expect


var options = {
  method: 'POST',
  url: 'http://10.31.194.91:8080/write/dinner',
  headers:
  {
    'postman-token': '19e5b55f-197e-fed5-1970-5b800b89c162',
    'cache-control': 'no-cache',
    'content-type': 'application/x-www-form-urlencoded'
  },
  form: {}
}
describe('POST REQUEST TO THE API', function () {
  it('Should Write task to the database when request method is post', function (done) {
    request(options, function (error, response, body) {
      if (error) throw new Error(error)

      expect('Successfully done').to.eqls(body)
      done()
    })
  })
})

