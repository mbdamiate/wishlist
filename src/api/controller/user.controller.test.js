const sinonChai = require('sinon-chai');
const chai = require('chai');
const { expect } = chai.use(sinonChai);
const { stub, spy } = require('sinon');
const faker = require('faker');
const fakers = require('../helpers/fakers')({ faker });

const Controller = require('./user.controller');

describe('UserController', () => {
  it('controller should be exists', () => {
    const controller = Controller({
      models: { user: {} }
    });

    expect(controller).to.exist;
    expect(controller).to.not.be.undefined;
  });

  describe('update()', () => {
    it('should be exists', () => {
      const controller = Controller({ models: { user: null } });
      expect(controller.update).to.not.be.undefined;
    });

    it('should be failure for some reason', async () => {
      const user = { update: stub().rejects() };
      const controller = Controller({
        models: { user }
      });
      const req = { body: { fullName: fakers.fullName() } };
      const res = { locals: { user: 'token' } };
      const next = spy();
      await controller.update(req, res, next);
      expect(next).to.have.been.called;
    });

    it('should be failure for not found user', async () => {
      const user = { update: stub().resolves({ rows: [] }) };
      const controller = Controller({
        models: { user }
      });
      const req = { body: { fullName: fakers.fullName() } };
      const res = {
        locals: { user: 'token' },
        status: spy(),
        json: spy()
      };
      const next = spy();
      await controller.update(req, res, next);
      expect(res.status).to.have.been.called;
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.called;
      expect(res.json).to.have.been.calledWith({ message: 'User not found' });
    });

    it('Should be success', async () => {
      const user = {
        id: fakers.uuid(),
        email: fakers.email(),
        fullName: fakers.fullName()
      };
      const userModel = { update: stub().resolves({ rows: [user] }) };
      const controller = Controller({
        models: { user: userModel }
      });
      const req = { body: { fullName: user.fullName } };
      const res = {
        locals: { user: 'token' },
        status: spy(),
        json: spy()
      };
      const next = spy();
      await controller.update(req, res, next);
      expect(userModel.update).to.have.been.called;
      expect(userModel.update).to.have.been.calledWith({
        id: res.locals.user,
        fullName: user.fullName
      });
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ id: user.id });
    });
  });

  describe('remove()', () => {
    it('should be exists', async () => {
      const controller = Controller({ models: { user: {} } });
      expect(controller.remove).to.exist;
    });

    it('should be faileure for not send token', async () => {
      const userModel = { remove: stub().rejects() };
      const controller = Controller({ models: { user: userModel } });
      const res = { locals: { user: null } };
      const next = stub();
      await controller.remove(null, res, next);
      expect(next).to.have.been.called;
    });

    it('should be failure for not found user', async () => {
      const userModel = { remove: stub().resolves({ rows: [] }) };
      const controller = Controller({ models: { user: userModel } });
      const res = {
        locals: { user: 1 },
        status: stub(),
        json: stub()
      };
      const next = spy();
      await controller.remove(null, res, next);
      expect(userModel.remove).to.have.been.calledWith({ id: 1 });
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'User not found' });
    });

    it('should be success', async () => {
      const user = {
        id: fakers.uuid(),
        email: fakers.email(),
        fullName: fakers.fullName()
      };
      const userModel = { remove: stub().resolves({ rows: [user] }) };
      const controller = Controller({ models: { user: userModel } });
      const res = {
        locals: { user: user.id },
        status: stub(),
        json: stub()
      };
      const next = spy();
      await controller.remove(null, res, next);
      expect(userModel.remove).to.have.been.calledWith({ id: user.id });
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ id: user.id });
      expect(next).to.not.have.been.called;
    });
  });

  describe('findAll()', () => {
    it('should be exists', () => {
      const controller = Controller({ models: { user: null } });
      expect(controller.findAll).to.exist;
    });

    it('should be failure for some reason', async () => {
      const findAll = stub().rejects();
      const userModel = { findAll };
      const controller = Controller({ models: { user: userModel } });
      const req = { query: {} };
      const next = spy();
      await controller.findAll(req, {}, next);
      expect(next).to.have.been.called;
    });

    it('should be failure for not found users', async () => {
      const findAll = stub().resolves({ rows: [] });
      const userModel = { findAll };
      const controller = Controller({ models: { user: userModel } });
      const req = { query: {} };
      const res = { status: stub(), json: stub() };
      const next = spy();
      await controller.findAll(req, res, next);
      expect(userModel.findAll).to.have.been.calledWith({ page: undefined });
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Users not found' });
      expect(next).to.not.have.been.called;
    });

    it('should be success not sending page number', async () => {
      const user = {
        id: fakers.uuid(),
        email: fakers.email(),
        fullName: fakers.fullName()
      };
      const findAll = stub().resolves({ rows: [user] });
      const userModel = { findAll };
      const controller = Controller({ models: { user: userModel } });
      const req = { query: {} };
      const res = { status: stub(), json: stub() };
      const next = spy();
      await controller.findAll(req, res, next);
      expect(userModel.findAll).to.have.been.calledWith({ page: undefined });
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({
        meta: { page: 1 },
        users: [user]
      });
      expect(next).to.not.have.been.called;
    });

    it('should be success sending page number', async () => {
      const user = {
        id: fakers.uuid(),
        email: fakers.email(),
        fullName: fakers.fullName()
      };
      const findAll = stub().resolves({ rows: [user] });
      const userModel = { findAll };
      const controller = Controller({ models: { user: userModel } });
      const req = { query: { page: 2 } };
      const res = { status: stub(), json: stub() };
      const next = spy();
      await controller.findAll(req, res, next);
      expect(userModel.findAll).to.have.been.calledWith({ page: 2 });
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({
        meta: { page: 2 },
        users: [user]
      });
      expect(next).to.not.have.been.called;
    });
  });
});
