SELECT 
  cumulative_deceased,
  cumulative_confirmed,
  UNIX_SECONDS(TIMESTAMP(date)) as date,
  New_cases,
  new_deceased,
  avg(New_cases) OVER(ORDER BY date
      ROWS BETWEEN 7 PRECEDING AND CURRENT ROW )
      as moving_average_cases,
  avg(new_deceased) OVER(ORDER BY date
    ROWS BETWEEN 7 PRECEDING AND CURRENT ROW )
    as moving_average_deceased,
    LAG(New_Cases) OVER (ORDER BY date) as cases_yesterday,
    LAG(new_deceased) OVER (ORDER BY date) as deceased_yesterday
  FROM (SELECT date,
   sum(abs(new_confirmed)) as New_cases, 
   sum(abs(new_deceased)) as new_deceased,
   sum(abs(cumulative_deceased)) as cumulative_deceased,
   sum(abs(cumulative_confirmed)) as cumulative_confirmed,
   FROM `bigquery-public-data.covid19_open_data.covid19_open_data`
   WHERE date < CURRENT_DATE()
--    country_name = 'United States of America'
  GROUP BY date
  ORDER BY date)