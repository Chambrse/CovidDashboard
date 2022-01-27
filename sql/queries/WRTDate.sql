SELECT 
   UNIX_TIMESTAMP(date) as date,
   CAST(sum(abs(new_cases)) AS DOUBLE) as New_cases, 
   CAST(sum(abs(new_deaths)) AS DOUBLE) as new_deceased,
   CAST(sum(abs(total_cases)) AS DOUBLE) as total_cases,
   CAST(sum(abs(total_deaths)) AS DOUBLE) as total_deaths,
   sum(new_cases_smoothed) as moving_average_cases,
   sum(new_deaths_smoothed) as moving_average_deceased,
   CAST(sum(people_vaccinated) AS DOUBLE) as people_vaccinated,
   CAST(sum(people_fully_vaccinated) AS DOUBLE) as people_fully_vaccinated,
   CAST(sum(total_boosters) AS DOUBLE) as total_boosters
   FROM `OWID`
   WHERE date < CURRENT_DATE() AND date != 0
  AND location = ?
  GROUP BY date
  ORDER BY date