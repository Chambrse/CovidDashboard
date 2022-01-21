var express = require('express');
var router = express.Router();
var bigquery = require('../bigquery/bigquery');

/* GET home page. */
router.get('/newCasesPerDay', function (req, res, next) {
  bigquery(`
  SELECT 
  UNIX_SECONDS(TIMESTAMP(date)) as date,
  New_cases,
  avg(New_cases) OVER(ORDER BY date
      ROWS BETWEEN 7 PRECEDING AND CURRENT ROW )
      as moving_average
  FROM (SELECT 
   sum(abs(new_confirmed)) as New_cases, 
   date 
   FROM \`bigquery-public-data.covid19_open_data.covid19_open_data\`
  GROUP BY date
  ORDER BY date)`
  ).then((data) => {

    res.json(data);
  })
});

module.exports = router;
