import React from "react";
import WeatherIcon from "./WeatherIcon";

function Countries({ countries, tooManyMatches, showMore, weather, search }) {
  if (tooManyMatches) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length > 1 && search !== "") {
    return (
      <div>
        {countries.map((x) => (
          <p key={x.name.official}>
            {x.name.common}{" "}
            <button onClick={() => showMore(x.name.common)}>show</button>
          </p>
        ))}
      </div>
    );
  } else if (countries.length === 1) {
    const country = countries[0];
    return (
      <div>
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
      </div>
    );
  } else {
    return null;
  }
}

export default Countries;
