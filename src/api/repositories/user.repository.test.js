
const { expect } = require('chai')
const sinon = require('sinon')
const fake = require('../utils/fakers')

const repository = require('./user.repository')

describe('User Repository', () => {

  it('to be exists', (done) => {
    expect(repository).to.be.exist
    done()
  })

  describe('find', () => {

    describe('success without input', () => {
      beforeEach(function () {
        const lenght = 1
        const users = Array(lenght).fill(fake.fakerUser())
        sinon
          .stub(repository, 'find')
          .usingPromise(Promise)
          .resolves({ result: users })
      });

      afterEach(function () {
        repository.find.restore();
      });

      it('expect to be an array and have all properties', (done) => {
        repository
          .find()
          .then(({ result }) => {
            expect(result).to.be.an('Array')

            const [first] = result
            expect(first).to.have.property('id')
            expect(first).to.have.property('email')
            expect(first).to.have.property('fullName')

            done()
          })
          .catch(done)
      })
    })

    describe('failure without input', () => {
      beforeEach(function () {
        sinon
          .stub(repository, 'find')
          .usingPromise(Promise)
          .rejects({ error: {} })
      });

      afterEach(function () {
        repository.find.restore();
      });

      it('expect to be an object', (done) => {
        repository
          .find()
          .then(done)
          .catch(({ error }) => {
            expect(error).to.not.be.undefined
            expect(error).to.be.an('Object')
            done()
          })
      })
    })

  })

})
