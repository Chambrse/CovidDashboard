var express = require('express');
var router = express.Router();
var fs = require('fs');
const WRTDate = fs.readFileSync('./sql/queries/WRTDate.sql').toString();
const getCountries = fs.readFileSync('./sql/queries/getCountries.sql').toString();
var MySQL = require('../sql/index');

/* GET home page. */
// router.get('/newCasesPerDay', function (req, res, next) {
//   MySQL.query(WRTDate, (error, response) => {
//     // console.log(error || response);
//     res.json(response);
//   });
// });

router.get('/owid/countryList', function (req, res, next) {
  MySQL.query(getCountries, (error, response) => {
    console.log(error || response);
    response.shift()
    res.json(response);
  });
});


router.get('/owid/country/:country_name', function (req, res, next) {
  MySQL.query(WRTDate, req.params.country_name, (error, response) => {
    console.log(error || response);
    res.json(response);
  });
});

module.exports = router;
