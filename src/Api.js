import { useEffect, useState } from "react";

// UPDATE ME WITH API KEY
const API_KEY = "d804dc49e15e407196b152253221103";
//const QUERY = "Brisbane";
const API_URL = "http://api.weatherapi.com";

function getForecastByQuery(query) {
  const url = `${API_URL}/v1/current.json?key=${API_KEY}&q=${query}&aqi=no`;
  console.log(query);
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      console.log(res.current.wind_kph);
      return {
        time: res.current.last_updated,
        text: res.current.condition.text,
        temp: res.current.temp_c,
        wind: res.current.wind_kph,
      };
    });
}

export function useWeather(QUERY) {
  const [loading, setLoading] = useState(true);
  const [headlines, setHeadlines] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getForecastByQuery(QUERY)
      .then((headlines) => {
        setHeadlines(headlines);
        //console.log(headlines);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [QUERY]);

  return {
    loading,
    headlines,
    error,
  };

  /*
  Above is shorthand for the following
  return {
    loading: loading,
    headlines: headlines,
    error: error
  };
  */
}
