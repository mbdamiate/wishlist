const sinonChai = require('sinon-chai');
const chai = require('chai');
const { expect } = chai.use(sinonChai);
const { stub, spy } = require('sinon');
const faker = require('faker');
const fakers = require('../helpers/fakers')({ faker });

const Controller = require('./auth.controller');

describe('AuthController', () => {
  it('controller should be exists', (done) => {
    const controller = Controller({
      models: { user: {} },
      utils: { jsonwebtoken: {} }
    });

    expect(controller).to.exist;
    expect(controller).to.not.be.undefined;

    done();
  });

  describe('register()', () => {
    it('should be failure when not send email and full name', async () => {
      const next = stub();
      const controller = Controller({
        models: { user: {} },
        utils: { jsonwebtoken: {} }
      });
      try {
        await controller.register({}, {}, next);
      } catch (err) {
        expect(err).to.not.be.undefined;
        expect(err.message).to.equals(
          "Cannot destructure property 'email' of 'req.body' as it is undefined."
        );
      }
    });

    it('should be success', async () => {
      const req = {
        body: { email: fakers.email(), fullName: fakers.fullName() }
      };
      const res = { status: spy(), json: spy() };
      const next = stub();
      const user = { id: null, email: null, fullName: null };
      const userModel = { create: stub().resolves({ rows: [user] }) };
      const controller = Controller({ models: { user: userModel }, utils: {} });

      await controller.register(req, res, next);
      expect(userModel.create).to.have.been.called;
      expect(userModel.create).to.have.been.calledWith({
        email: req.body.email,
        fullName: req.body.fullName
      });
      expect(res.status).to.have.been.called;
      expect(res.json).to.have.been.called;
    });

    it('should be failure', async () => {
      const email = fakers.email();
      const fullName = fakers.fullName();
      const req = { body: { email, fullName } };
      const next = stub();
      const userModel = { create: stub().rejects() };
      const controller = Controller({ models: { user: userModel }, utils: {} });

      await controller.register(req, {}, next);
      expect(userModel.create).to.have.been.called;
      expect(userModel.create).to.have.been.calledWith({ email, fullName });
      expect(next).to.have.been.called;
    });
  });

  describe('signIn()', () => {
    it('should be failure for some reason', async () => {
      const email = fakers.email();
      const fullName = fakers.fullName();
      const req = { body: { email, fullName } };
      const next = spy();
      const userModel = { findByEmail: stub().rejects() };
      const controller = Controller({
        models: { user: userModel },
        utils: { jsonwebtoken: {} }
      });

      await controller.signIn(req, {}, next);
      expect(next).to.have.been.called;
    });

    it('should be failure for not finding a user', async () => {
      const email = fakers.email();
      const fullName = fakers.fullName();
      const req = { body: { email, fullName } };
      const res = { status: spy(), json: spy() };
      const next = spy();
      const user = { findByEmail: stub().resolves({ rows: [] }) };
      const jsonwebtoken = { sign: spy() };
      const controller = Controller({
        models: { user },
        utils: { jsonwebtoken }
      });

      await controller.signIn(req, res, next);
      expect(user.findByEmail).to.have.been.called;
      expect(jsonwebtoken.sign).to.not.have.been.called;
      expect(res.status).to.have.been.called;
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.called;
      expect(res.json).to.have.been.calledWith({ message: 'Users not found' });
      expect(next).to.not.have.been.called;
    });

    it('should be success', async () => {
      const email = fakers.email();
      const fullName = fakers.fullName();
      const req = { body: { email, fullName } };
      const res = { status: spy(), json: spy() };
      const next = spy();
      const user = { findByEmail: stub().resolves({ rows: [{ id: 1 }] }) };
      const jsonwebtoken = { sign: stub().returns('token') };
      const controller = Controller({
        models: { user },
        utils: { jsonwebtoken }
      });

      await controller.signIn(req, res, next);
      expect(user.findByEmail).to.have.been.called;
      expect(jsonwebtoken.sign).to.have.been.called;
      expect(res.status).to.have.been.called;
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.called;
      expect(res.json).to.have.been.calledWith({ token: 'token' });
      expect(next).to.not.have.been.called;
    });
  });
});
