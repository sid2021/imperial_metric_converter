var chaiHttp = require("chai-http");
var chai = require("chai");
var assert = chai.assert;
var server = require("../server");

chai.use(chaiHttp);

describe("Functional Tests", function () {
  describe("Routing Tests", function () {
    describe("GET /api/convert => conversion object", function () {
      it("Convert 10L (valid input)", function (done) {
        chai
          .request(server)
          .get("/api/convert")
          .query({ input: "10L" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 10);
            assert.equal(res.body.initUnit, "l");
            assert.approximately(res.body.returnNum, 2.64172, 0.1);
            assert.equal(res.body.returnUnit, "gal");
            done();
          });
      });

      it("Convert 32g (invalid input unit)", function (done) {
        chai
          .request(server)
          .get("/api/convert")
          .query({ input: "32g" })
          .end(function (err, res) {
            assert.deepEqual(res.body, { error: "invalid unit" });
            done();
          });
      });

      it("Convert 3/7.2/4kg (invalid number)", function (done) {
        chai
          .request(server)
          .get("/api/convert")
          .query({ input: "3/7.2/4kg" })
          .end(function (err, res) {
            assert.deepEqual(res.body, { error: "invalid number" });
            done();
          });
      });

      it("Convert 3/7.2/4kilomegagram (invalid number and unit)", function (done) {
        chai
          .request(server)
          .get("/api/convert")
          .query({ input: "3/7.2/4kilomegagram" })
          .end(function (err, res) {
            assert.deepEqual(res.body, { error: "invalid number and unit" });
            done();
          });
      });

      it("Convert kg (no number)", function (done) {
        chai
          .request(server)
          .get("/api/convert")
          .query({ input: "kg" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 1);
            assert.equal(res.body.initUnit, "kg");
            assert.approximately(res.body.returnNum, 2.20462, 0.1);
            assert.equal(res.body.returnUnit, "lbs");
            done();
          });
      });
    });
  });
});
