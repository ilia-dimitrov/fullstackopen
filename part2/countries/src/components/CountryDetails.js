import React from "react";
import WeatherIcon from "./WeatherIcon";

function CountryDetails({ country, weather }) {
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h4>Languages:</h4>
      <ul>
        {Object.entries(country.languages).map(([code, language]) => (
          <li key={`${country.name.common}-${code}`}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="" />
      {weather ? (
        <div>
          {console.log(weather)}
          <h1>Weather in {country.capital}</h1>
          <p>temperature {Math.round(weather.main.temp - 273)} Celcius</p>
          <WeatherIcon
            iconCode={weather.weather[0].icon}
            description={weather.weather[0].description}
          />
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      ) : null}
    </>
  );
}

export default CountryDetails;
