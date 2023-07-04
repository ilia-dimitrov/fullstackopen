import React from "react";

function WeatherIcon({ iconCode, description }) {
  const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/w/${iconCode}.png`;
  };

  return <img src={getWeatherIconUrl(iconCode)} alt={description} />;
}

export default WeatherIcon;
