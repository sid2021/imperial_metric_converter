function ConvertHandler() {
  let units = {
    gal: "l",
    l: "gal",
    lbs: "kg",
    kg: "lbs",
    mi: "km",
    km: "mi",
  };

  this.getNum = function (input) {
    let result;
    let regex = /[A-Za-z]+/;
    let regexInvalidNum = /\//g;
    let splittedInput = input.split(regex)[0];

    if (splittedInput.length === 0) {
      result = 1;
      return result;
    } else if ((splittedInput.match(regexInvalidNum) || []).length > 1) {
      result = "invalid number";
      return result;
    } else {
      result = Math.round(Number(eval(splittedInput)) * 100000) / 100000;
      //console.log(result);
      return result;
    }
  };

  this.getUnit = function (input) {
    let result;
    let regex = /[A-Za-z]+/;
    let unitAfterSplit = input.match(regex);
    if (!unitAfterSplit) {
      result = "no unit";
      return result;
    } else {
      let result = unitAfterSplit[0].toLowerCase();

      if (!units[result]) {
        result = "invalid unit";
        console.log(result);
        return result;
      } else {
        return result;
      }
    }
  };

  this.getReturnUnit = function (initUnit) {
    let result = units[initUnit];
    console.log(result);
    return result;
  };

  this.spellOutUnit = function (unit) {
    let fullUnits = {
      gal: "gallons",
      l: "liters",
      lbs: "pounds",
      kg: "kilograms",
      mi: "miles",
      km: "kilometers",
    };

    let result = fullUnits[unit];
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let factors = {
      gal: 3.78541,
      l: eval(1 / 3.78541),
      lbs: 0.453592,
      kg: eval(1 / 0.453592),
      mi: 1.60934,
      km: eval(1 / 1.60934),
    };

    var result = Math.round(initNum * factors[initUnit] * 100000) / 100000;
    // console.log(result);

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    result =
      initNum.toString() +
      " " +
      this.spellOutUnit(initUnit) +
      " converts to " +
      returnNum.toString() +
      " " +
      this.spellOutUnit(returnUnit);

    return result;
  };
}

module.exports = ConvertHandler;
