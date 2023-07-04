import axios from "axios";
import { useState, useEffect } from "react";
import Countries from "./components/countries"; // Update the import statement

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

  return (
    <div className="App">
      <p>
        find countries <input value={search} onChange={handleValue} />
      </p>
      <Countries
        countries={countryFilter}
        tooManyMatches={tooManyMatches}
        showMore={showMore}
        weather={weather}
        search={search} // Pass search as a prop
      />
    </div>
  );
}

export default App;
