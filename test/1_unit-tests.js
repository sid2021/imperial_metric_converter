var chai = require("chai");
var assert = chai.assert;
var ConvertHandler = require("../controllers/convertHandler.js");

var convertHandler = new ConvertHandler();

describe("Unit Tests", function () {
  describe("Function convertHandler.getNum(input)", function () {
    it("Whole number input", function () {
      var input = "32L";
      assert.equal(convertHandler.getNum(input), 32);
    });

    it("Decimal Input", function () {
      var input = "0.123GAL";
      assert.equal(convertHandler.getNum(input), 0.123);
    });

    it("Fractional Input", function () {
      var input = "1/2lbs";
      assert.equal(convertHandler.getNum(input), 0.5);
    });

    it("Fractional Input w/ Decimal", function () {
      var input = "1/2.2lbs";
      assert.equal(convertHandler.getNum(input), 0.45455);
    });

    it("Invalid Input (double fraction)", function () {
      var input = "1/2/2mi";
      assert.deepEqual(convertHandler.getNum(input), "invalid number");
    });

    it("No Numerical Input", function () {
      var input = "mi";
      assert.equal(convertHandler.getNum(input), 1);
    });
  });

  describe("Function convertHandler.getUnit(input)", function () {
    describe("For Each Valid Unit Inputs", function () {
      var input = [
        "gal",
        "l",
        "mi",
        "km",
        "lbs",
        "kg",
        "GAL",
        "L",
        "MI",
        "KM",
        "LBS",
        "KG",
      ];
      var expect = [
        "gal",
        "l",
        "mi",
        "km",
        "lbs",
        "kg",
        "gal",
        "l",
        "mi",
        "km",
        "lbs",
        "kg",
      ];
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.getUnit(ele), expect[i]);
      });
    });

    it("Unknown Unit Input", function () {
      var input = "2lbsa";
      assert.equal(convertHandler.getUnit(input), "invalid unit");
    });
  });

  describe("Function convertHandler.getReturnUnit(initUnit)", function () {
    it("For Each Valid Unit Inputs", function () {
      var input = ["gal", "l", "mi", "km", "lbs", "kg"];
      var expect = ["l", "gal", "km", "mi", "kg", "lbs"];
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
    });
  });

  describe("Function convertHandler.spellOutUnit(unit)", function () {
    it("For Each Valid Unit Inputs", function () {
      var input = ["gal", "l", "mi", "km", "lbs", "kg"];
      var expect = [
        "gallons",
        "liters",
        "miles",
        "kilometers",
        "pounds",
        "kilograms",
      ];
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
    });
  });

  describe("Function convertHandler.convert(num, unit)", function () {
    it("Gal to L", function () {
      var input = [5, "gal"];
      var expected = 18.9271;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
    });

    it("L to Gal", function () {
      var input = [3, "l"];
      var expected = 0.79252;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
    });

    it("Mi to Km", function () {
      var input = [5, "mi"];
      var expected = 8.0467;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
    });

    it("Km to Mi", function () {
      var input = [3, "km"];
      var expected = 1.86412;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
    });

    it("Lbs to Kg", function () {
      var input = [3, "lbs"];
      var expected = 1.36078;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
    });

    it("Kg to Lbs", function () {
      var input = [5, "kg"];
      var expected = 11.02312;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
    });
  });
});
