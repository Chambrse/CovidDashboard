var express = require('express');
var router = express.Router();
var bigquery = require('../bigquery/bigquery');
var fs = require('fs');
const WRTDate = fs.readFileSync('./src/sql/WRTDate.sql').toString();

/* GET home page. */
router.get('/newCasesPerDay', function (req, res, next) {
  bigquery(WRTDate).then((data) => {
    res.json(data);
  })
});

module.exports = router;
