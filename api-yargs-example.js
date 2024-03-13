const axios = require("axios");

function countryInfoAndWeather(country) {
  axios.get("https://restcountries.com/v3.1/name/" + country).then((resp) => {
    //const cntry = resp.data[0];
    //const capital = cntry.capital[0];

    const [{ capital: capital, population: popu, timezones: time }] = resp.data;
    axios
      .get(
        "http://api.openweathermap.org/geo/1.0/direct?q=" +
          capital +
          "&appid=f79aaf655870e5c2d7e889013765581b"
      )
      .then((geoResp) => {
        //console.log(geoResp);
        // const koorLat = geoResp.data[0].lat;
        // const koorLon = geoResp.data[0].lon;

        const [{ lat: koorLat, lon: koorLon }] = geoResp.data;

        axios
          .get(
            "https://api.openweathermap.org/data/2.5/weather?lat=" +
              koorLat +
              "&lon=" +
              koorLon +
              "&appid=f79aaf655870e5c2d7e889013765581b&units=metric"
          )
          .then((weathResp) => {
            // const wResp = weathResp.data;
            // //console.log(wResp);
            // const cloud = wResp.weather[0].description;
            // //console.log(bulut);
            // const degree = wResp.main.temp;
            // const feeels = wResp.main.feels_like;

            const {
              weather: [{ description: cloud }],
              main: { temp: degree, feels_like: feeels },
            } = weathResp.data;

            console.log(
              `Country name: ${country}. Capital: ${capital}. Population : ${popu}. Timezone: ${time} Coordinates: ${koorLat.toFixed(
                2
              )},${koorLon.toFixed(
                2
              )}. Weather: ${degree} degree and ${cloud}. Feels like: ${feeels} `
            );
          })
          .catch((err) => console.log(err));
      });
  });
}

module.exports = countryInfoAndWeather;
