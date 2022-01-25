select
sum(`population`)
FROM (Select 
country_name, subregion1_name, subregion2_name, max(`population`) as `population`
FROM `bigquery-public-data.covid19_open_data.covid19_open_data`
group by country_name, subregion1_name, subregion2_name)