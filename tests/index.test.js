
const supertest = require('supertest')
const app = require('../src/config/ioc')
const request = supertest(app)
const { expect } = require('chai')

describe('Index API', () => {

  describe('GET /api/health', (done) => {

    it('expect success', (done) => {
      request
        .get('/api/health')
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            expect(res.status).to.equals(200)
            expect(res.body).to.have.property('uptime')
            done()
          }
        })
    })

  })

})
