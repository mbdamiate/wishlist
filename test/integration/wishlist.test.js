const supertest = require('supertest');
const app = require('../../src/config/ioc');
const request = supertest(app);
const { expect } = require('chai');
const faker = require('faker');
const fakers = require('../../src/api/helpers/fakers')({
  faker,
});

describe('Wishlist API', () => {
  const fullName = fakers.fullName();
  const [firstName, lastName] = fullName.split(' ');
  const email = fakers.email(firstName, lastName);
  let token;

  before((done) => {
    request
      .post('/api/auth/register')
      .send({ email, fullName })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).to.equals(201);
          expect(res.body).to.have.property('id');
          userId = res.body.id;
          done();
        }
      });
  });

  before((done) => {
    request
      .post('/api/auth/signin')
      .send({ email })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).to.equals(200);
          expect(res.body).to.have.property('token');
          token = res.body.token;
          done();
        }
      });
  });

  describe('POST /api/wishlist', () => {
    it('expect failure not sending product id', (done) => {
      request
        .post('/api/wishlist')
        .set('Authorization', `Bearer ${token}`)
        .send({ product: { id: '' } })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.status).to.equals(422);
            done();
          }
        });
    });
  });
});
