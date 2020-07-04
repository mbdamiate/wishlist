const supertest = require("supertest");
const app = require("../../src/config/ioc");
const request = supertest(app);
const { expect } = require("chai");
const faker = require("faker");
const fakers = require("../../src/api/helpers/fakers")({ faker });

describe("Users API", () => {
  const fullName = fakers.fullName();
  const [firstName, lastName] = fullName.split(" ");
  const email = fakers.email(firstName, lastName);
  let token;

  before((done) => {
    request
      .post("/api/auth/register")
      .send({ email, fullName })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).to.equals(201);
          expect(res.body).to.have.property("id");
          userId = res.body.id;
          done();
        }
      });
  });

  before((done) => {
    request
      .post("/api/auth/signin")
      .send({ email })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).to.equals(200);
          expect(res.body).to.have.property("token");
          token = res.body.token;
          done();
        }
      });
  });

  describe("GET /api/users", () => {
    it("expect success without page query", (done) => {
      request
        .get("/api/users")
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.status).to.equals(200);
            expect(res.body).to.have.property("meta");
            expect(res.body).to.have.property("users");
            done();
          }
        });
    });

    it("expect success with page query equals 1", (done) => {
      request
        .get("/api/users?page=1")
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.status).to.equals(200);
            expect(res.body).to.have.property("meta");
            expect(res.body).to.have.property("users");
            done();
          }
        });
    });

    it("expect failure with page query equals 2", (done) => {
      request
        .get("/api/users?page=2")
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.status).to.equals(404);
            expect(res.body).to.have.property("message");
            done();
          }
        });
    });

    it("expect failure not sending authorization header", (done) => {
      request.get("/api/users?page=2").end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).to.equals(401);
          expect(res.body).to.have.property("message");
          done();
        }
      });
    });
  });

  describe("PUT /api/users", () => {
    it("expect to be success", (done) => {
      const newFullName = fakers.fullName();
      request
        .patch("/api/users")
        .send({ fullName: newFullName })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            done(error);
          } else {
            expect(res.status).to.equals(200);
            expect(res.body).to.have.property("id");
            done();
          }
        });
    });

    it("expect to be failure not sending full name", (done) => {
      request
        .patch("/api/users")
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            done(error);
          } else {
            expect(res.status).to.equals(422);
            done();
          }
        });
    });

    it("expect failure not sending authorization header", (done) => {
      const newFullName = fakers.fullName();
      request
        .patch("/api/users")
        .send({ fullName: newFullName })
        .end((err, res) => {
          if (err) {
            done(error);
          } else {
            expect(res.status).to.equals(401);
            done();
          }
        });
    });
  });

  describe("DELETE /api/users", () => {
    it("expect to be success", (done) => {
      request
        .delete("/api/users")
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.status).to.equals(200);
            expect(res.body).to.have.property("id");
            done();
          }
        });
    });

    it("expect to be failure not sending authorization header", (done) => {
      request.delete("/api/users").end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).to.equals(401);
          done();
        }
      });
    });
  });
});
