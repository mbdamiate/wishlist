
const supertest = require('supertest')
const { expect } = require('chai')
const app = require('../../src/config/app')

const request = supertest(app)

describe('User', () => {
  describe('GET /api/users', () => {
    it('sample', (done) => {
      request
        .get('api/users')
        .expect(404)
        .end((err) => {
          if (err) {
            done(err)
          }
          else {
            done()
          }
        })
    })
  })
})
