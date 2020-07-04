const supertest = require("supertest");
const app = require("../../src/config/ioc");
const request = supertest(app);
const { expect } = require("chai");
const faker = require("faker");
const fakers = require("../../src/api/helpers/fakers")({ faker });

describe("Auth API", () => {
  let fullName;
  let email;

  before(() => {
    fullName = fakers.fullName();
    let [firstName, lastName] = fullName.split(" ");
    email = fakers.email(firstName, lastName);
  });

  describe("POST /api/auth/register", () => {
    it("expect to be success", (done) => {
      request
        .post("/api/auth/register")
        .send({ email, fullName })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.status).to.equals(201);
            expect(res.body).to.have.property("id");
            done();
          }
        });
    });

    it("expect invalid email", (done) => {
      request
        .post("/api/auth/register")
        .send({ email: "jdfahoa8342", fullName })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.status).to.equals(422);
            done();
          }
        });
    });

    it("expect invalid full name", (done) => {
      request
        .post("/api/auth/register")
        .send({ email })
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

  describe("POST /api/auth/signin", () => {
    it("expect sucess", (done) => {
      request
        .post("/api/auth/signin")
        .send({ email })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("token");
            done();
          }
        });
    });

    it("expect invalid email", (done) => {
      request
        .post("/api/auth/signin")
        .send({ email: "ohjaiaoioas" })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.status).to.equal(422);
            done();
          }
        });
    });

    it("expect user not found", (done) => {
      request
        .post("/api/auth/signin")
        .send({ email: fakers.email() })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.status).to.equal(404);
            done();
          }
        });
    });
  });
});
