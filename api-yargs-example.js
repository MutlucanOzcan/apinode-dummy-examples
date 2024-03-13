const axios = require("axios");

function countryInfoAndWeather(country) {
  axios.get("https://restcountries.com/v3.1/name/" + country).then((resp) => {
    const cntry = resp.data[0];
    const capital = cntry.capital[0];
    axios
      .get(
        "http://api.openweathermap.org/geo/1.0/direct?q=" +
          capital +
          "&appid=f79aaf655870e5c2d7e889013765581b"
      )
      .then((geoResp) => {
        //console.log(geoResp);
        const koorLat = geoResp.data[0].lat;
        const koorLon = geoResp.data[0].lon;

        axios
          .get(
            "https://api.openweathermap.org/data/2.5/weather?lat=" +
              koorLat +
              "&lon=" +
              koorLon +
              "&appid=f79aaf655870e5c2d7e889013765581b&units=metric"
          )
          .then((weathResp) => {
            const wResp = weathResp.data;
            //console.log(wResp);
            const cloud = wResp.weather[0].description;
            //console.log(bulut);
            const derece = wResp.main.temp;
            const feeels = wResp.main.feels_like;
            console.log(
              `Country name: ${country}. Capital: ${capital}. Coordinates: ${koorLat.toFixed(
                2
              )},${koorLon.toFixed(
                2
              )}. Weather: ${derece} degree ve ${cloud}. Feels like: ${feeels} `
            );
          })
          .catch((err) => console.log(err));
      });
  });
}

module.exports = countryInfoAndWeather;
