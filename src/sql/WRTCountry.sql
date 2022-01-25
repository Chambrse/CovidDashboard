SELECT 
country_name, 
date,
population,

sum(new_confirmed) new_confirmed,
sum(new_deceased) new_deceased,
sum(new_recovered) new_recovered,
sum(cumulative_confirmed) cumulative_confirmed,
sum(cumulative_deceased) cumulative_deceased,
sum(cumulative_recovered) cumulative_recovered ,

sum(cumulative_tested) cumulative_tested,
sum(new_persons_vaccinated) new_persons_vaccinated,
sum(new_vaccine_doses_administered)new_vaccine_doses_administered,
sum(new_persons_fully_vaccinated) new_persons_fully_vaccinated,
sum(cumulative_persons_vaccinated)cumulative_persons_vaccinated,
sum(cumulative_persons_fully_vaccinated) cumulative_persons_fully_vaccinated,
sum(investment_in_vaccines)investment_in_vaccines, 

sum(cumulative_hospitalized_patients)cumulative_hospitalized_patients,
sum(current_intensive_care_patients)current_intensive_care_patients, 
sum(current_hospitalized_patients)current_hospitalized_patients,
sum(contact_tracing) 

FROM `bigquery-public-data.covid19_open_data.covid19_open_data` 
where country_name in ("Vietnam", "Singapore", "Canada", "United States of America")
AND date BETWEEN "2020-01-01" AND CURRENT_DATE()
group by 1,2,3
order by date