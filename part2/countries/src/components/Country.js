import React from "react";

function Country({ country, showMore }) {
  return (
    <p>
      {country.name.common}{" "}
      <button onClick={() => showMore(country.name.common)}>show</button>
    </p>
  );
}

export default Country;
