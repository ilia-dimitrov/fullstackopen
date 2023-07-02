import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState([]);
  const [countryFilter, setCountryFilter] = useState([]);
  const [tooManyMatches, setTooManyMatches] = useState(false);
  const [weather, setWeather] = useState(null);

  const api_key = process.env.REACT_APP_API;

  const handleValue = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://studies.cs.helsinki.fi/restcountries/api/all"
        );
        setCountry(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchWeather = async (city) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
        );
        setWeather(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (countryFilter.length === 1) {
      const country = countryFilter[0];
      fetchWeather(country.capital);
    } else {
      setWeather(null);
    }
  }, [countryFilter, api_key]);

  useEffect(() => {
    const filteredCountries = country.filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );
    setCountryFilter(filteredCountries);
    setTooManyMatches(filteredCountries.length >= 10 && search !== "");
  }, [search, country]);

  const showMore = (name) => {
    setSearch(name);
  };

  function Countries({ countries }) {
    if (tooManyMatches) {
      return <p>Too many matches, specify another filter</p>;
    } else if (countries.length > 1 && search !== "") {
      return countries.map((x) => {
        return (
          <p key={x.name.official}>
            {x.name.common}{" "}
            <button onClick={() => showMore(x.name.common)}>show</button>
          </p>
        );
      });
    } else if (countries.length === 1) {
      const country = countries[0];
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
              <img
                src={getWeatherIconUrl(weather.weather[0].icon)}
                alt={weather.weather[0].description}
              />
              <p>wind {weather.wind.speed} m/s</p>
            </div>
          ) : null}
        </>
      );
    } else {
      return null;
    }
  }
  const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/w/${iconCode}.png`;
  };

  return (
    <div className="App">
      <p>
        find countries <input value={search} onChange={handleValue} />
      </p>
      <Countries countries={countryFilter} />
    </div>
  );
}

export default App;
