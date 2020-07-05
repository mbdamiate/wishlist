const sinonChai = require('sinon-chai');
const chai = require('chai');
const { expect } = chai.use(sinonChai);
const { stub, restore } = require('sinon');

const Controller = require('./index.controller');

describe('IndexController', () => {
  function mockResponse() {
    const res = {};
    res.status = stub().returns(res);
    res.json = stub().returns(res);
    return res;
  }

  function restoreResponse() {
    restore();
  }

  before((done) => {
    controller = new Controller();
    done();
  });

  it('expect controller to exist', (done) => {
    expect(controller).to.exist;
    expect(controller).to.not.be.undefined;
    done();
  });

  describe('health()', () => {
    beforeEach(() => {
      res = mockResponse();
    });

    afterEach(() => {
      restoreResponse();
    });

    it('expect to exists', (done) => {
      expect(controller.health).to.exist;
      expect(controller.health).to.not.be.undefined;
      done();
    });

    it('expect to return uptime in millis', (done) => {
      const result = controller.health(null, res);
      expect(result.status).to.have.been.calledOnce;
      expect(result.status).to.have.been.calledWith(200);
      expect(result.json).to.have.been.calledOnce;
      done();
    });
  });
});
