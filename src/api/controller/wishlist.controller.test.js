const sinonChai = require('sinon-chai');
const chai = require('chai');
const { expect } = chai.use(sinonChai);
const { stub, spy } = require('sinon');
const faker = require('faker');
const fakers = require('../helpers/fakers')({ faker });

const Controller = require('./wishlist.controller');

describe('WishlistController', () => {
  it('Controller should be exists', () => {
    const controller = Controller({
      models: { wishlist: null, product: null }
    });
    expect(controller).to.not.undefined;
  });

  describe('create()', () => {
    it('should be exists', () => {
      const controller = Controller({
        models: { wishlist: {}, product: {} }
      });
      expect(controller.create).to.not.be.undefined;
    });

    it('should be failure for some reason', async () => {
      const productModel = { findById: stub().rejects() };
      const controller = Controller({
        models: { wishlist: {}, product: productModel }
      });
      const userId = fakers.uuid();
      const productId = fakers.uuid();
      const req = { body: { product: { id: productId } } };
      const res = { locals: { user: userId } };
      const next = spy();
      await controller.create(req, res, next);
      expect(productModel.findById).to.have.been.calledWith({ id: productId });
      expect(next).to.have.been.called;
    });

    it('should be failure for whishlist model error', async () => {
      const userId = fakers.uuid();
      const productId = fakers.uuid();
      const productModel = { findById: stub().resolves({ id: productId }) };
      const wishlistModel = { findProductByIdAndUserId: stub().rejects() };
      const controller = Controller({
        models: {
          wishlist: wishlistModel,
          product: productModel
        }
      });
      const req = { body: { product: { id: productId } } };
      const res = { locals: { user: userId } };
      const next = spy();
      await controller.create(req, res, next);
      expect(productModel.findById).to.have.been.calledWith({ id: productId });
      expect(wishlistModel.findProductByIdAndUserId).to.have.been.calledWith({
        userId,
        productId
      });
      expect(next).to.have.been.called;
    });

    it('should be failure for product already exists', async () => {
      const userId = fakers.uuid();
      const productId = fakers.uuid();
      const productModel = { findById: stub().resolves({ id: productId }) };
      const wishlistModel = {
        findProductByIdAndUserId: stub().resolves({ rows: [1] })
      };
      const controller = Controller({
        models: {
          wishlist: wishlistModel,
          product: productModel
        }
      });
      const req = { body: { product: { id: productId } } };
      const res = {
        locals: { user: userId },
        status: stub(),
        json: stub()
      };
      const next = spy();
      await controller.create(req, res, next);
      expect(productModel.findById).to.have.been.calledWith({ id: productId });
      expect(wishlistModel.findProductByIdAndUserId).to.have.been.calledWith({
        userId,
        productId
      });
      expect(res.status).to.have.been.calledWith(409);
      expect(res.json).to.have.been.calledWith({
        message: 'Product already exists'
      });
      expect(next).to.not.have.been.called;
    });

    it('should be success', async () => {
      const userId = fakers.uuid();
      const productId = fakers.uuid();
      const productModel = { findById: stub().resolves({ id: productId }) };
      const wishlistModel = {
        findProductByIdAndUserId: stub().resolves({ rows: [] }),
        create: stub().resolves({ rows: [{ id: 1 }] })
      };
      const controller = Controller({
        models: {
          wishlist: wishlistModel,
          product: productModel
        }
      });
      const req = { body: { product: { id: productId } } };
      const res = {
        locals: { user: userId },
        status: stub(),
        json: stub()
      };
      const next = spy();
      await controller.create(req, res, next);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({ id: 1 });
    });
  });

  describe('remove()', () => {
    it('should be exists', () => {
      const controller = Controller({
        models: {
          product: {},
          wishlist: {}
        }
      });
      expect(controller.remove).to.not.be.undefined;
    });

    it('should be failures for some reason', async () => {
      const controller = Controller({
        models: {
          product: {},
          wishlist: { remove: stub().rejects() }
        }
      });
      const req = { body: { product: { id: 0 } } };
      const res = { locals: { user: null } };
      const next = stub();
      await controller.remove(req, res, next);
      expect(next).to.have.been.called;
    });

    it('should be failure for not found product or user', async () => {
      const productId = fakers.uuid();
      const userId = fakers.uuid();
      const wishlistModel = { remove: stub().resolves({ rows: [] }) };
      const req = { body: { product: { id: productId } } };
      const res = {
        locals: { user: userId },
        status: stub(),
        json: stub()
      };
      const next = stub();
      const controller = Controller({
        models: { wishlist: wishlistModel, product: {} }
      });

      await controller.remove(req, res, next);
      expect(wishlistModel.remove).to.have.been.calledWith({
        userId,
        productId
      });
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: 'Product not found'
      });
      expect(next).to.not.have.been.called;
    });

    it('should be success', async () => {
      const productId = fakers.uuid();
      const userId = fakers.uuid();
      const product = { id: productId };
      const wishlistModel = { remove: stub().resolves({ rows: [product] }) };
      const req = { body: { product: { id: productId } } };
      const res = {
        locals: { user: userId },
        status: stub(),
        json: stub()
      };
      const next = stub();
      const controller = Controller({
        models: { wishlist: wishlistModel, product: {} }
      });

      await controller.remove(req, res, next);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ id: productId });
      expect(next).to.not.have.been.called;
    });
  });

  describe('findAll()', () => {
    it('should be exists', () => {
      const controller = Controller({
        models: {
          product: {},
          wishlist: {}
        }
      })
      expect(controller.findAll).to.exist;
    })

    it('should be failure for some reason and not send page', async () => {
      const userId = fakers.uuid();
      const req = {
        query: {}
      };
      const res = {
        locals: {
          user: userId
        }
      };
      const next = stub();
      const wishlistModel = { findAllByUser: stub().rejects() };
      const controller = Controller({
        models: {
          wishlist: wishlistModel,
          product: {}
        }
      });
      await controller.findAll(req, res, next);
      expect(wishlistModel.findAllByUser).to.have.been.calledWith({
        userId,
        page: 1
      });
      expect(next).to.have.been.called;
    });

    it('should be failure for not found products in wishlist', async () => {
      const userId = fakers.uuid();
      const req = {
        query: {}
      };
      const res = {
        locals: {
          user: userId
        },
        status: stub(),
        json: stub()
      };
      const next = stub();
      const rows = [];
      const wishlistModel = { findAllByUser: stub().resolves({ rows }) };
      const controller = Controller({
        models: {
          wishlist: wishlistModel,
          product: {}
        }
      });
      await controller.findAll(req, res, next);
      expect(next).to.not.have.been.called;
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: 'No products found in your wishlist'
      });
    });

    it('should be success', async () => {
      const userId = fakers.uuid();
      const req = {
        query: {}
      };
      const res = {
        locals: {
          user: userId
        },
        status: stub(),
        json: stub()
      };
      const next = stub();
      const item = {
        id: fakers.uuid(),
        product_id: fakers.uuid(),
        user_id: fakers.uuid()
      };
      const rows = [item];
      const product = {
        id: item.product_id
      };
      const products = [product];
      const wishlistModel = { findAllByUser: stub().resolves({ rows }) };
      const productModel = { findManyById: stub().resolves({ products }) };
      const controller = Controller({
        models: {
          wishlist: wishlistModel,
          product: productModel
        }
      });
      await controller.findAll(req, res, next);
      expect(next).to.not.have.been.called;
      expect(productModel.findManyById).to.have.been.calledWith({
        productsId: rows.map((item) => item.product_id)
      });
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({
        meta: { page: 1 },
        products: { products }
      });
    });
  });
});
