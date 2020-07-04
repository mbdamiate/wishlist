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
  const productId = '1bf0f365-fbdd-4e21-9786-da459d78dd1f';
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

  after((done) => {
    request
      .delete('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).to.equals(200);
          done();
        }
      });
  })

  describe('POST /api/wishlist', () => {
    // after((done) => {
    //   request
    //     .delete('/api/wishlist')
    //     .set('Authorization', `Bearer ${token}`)
    //     .send({ product: { id: productId } })
    //     .end((err, res) => {
    //       if (err) {
    //         done(err);
    //       } else {
    //         console.log(res.body);
    //         // expect(res.status).to.equals(200);
    //         done();
    //       }
    //     });
    // });

    it('expect failure to not send product id', (done) => {
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

    it('expect failure to send invalid product id', (done) => {
      request
        .post('/api/wishlist')
        .set('Authorization', `Bearer ${token}`)
        .send({ product: { id: 'abc123' } })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.status).to.equals(422);
            done();
          }
        });
    });

    it('expect failure to send inexistent product id', (done) => {
      request
        .post('/api/wishlist')
        .set('Authorization', `Bearer ${token}`)
        .send({ product: { id: fakers.uuid() } })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.status).to.equals(404);
            done();
          }
        });
    });

    it('expect success to send an valid and existent product id', (done) => {
      request
        .post('/api/wishlist')
        .set('Authorization', `Bearer ${token}`)
        .send({ product: { id: productId } })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.status).to.equals(201);
            expect(res.body).to.have.property('id');
            done();
          }
        });
    });

    it('expect failure to send already added product id', (done) => {
      request
        .post('/api/wishlist')
        .set('Authorization', `Bearer ${token}`)
        .send({ product: { id: productId } })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.status).to.equals(409);
            done();
          }
        });
    });
  });

  // describe('DELETE /api/wishlist', () => {
  //   // Deve adicionar o produto
  //   // before((done) => {
  //   //   done();
  //   // });

  //   it('expect failure to send ', (done) => {
  //     request
  //       .delete('/api/wishlist')
  //       .set('Authorization', `Bearer ${token}`)
  //       .send({ product: { id: '' } })
  //       .end((err, res) => {
  //         if (err) {
  //           done(err);
  //         } else {
  //           expect(res.status).to.equals(200);
  //           done();
  //         }
  //       });
  //   })
  // });

});
