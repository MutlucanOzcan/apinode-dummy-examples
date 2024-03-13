// const https = require("https");
// const { json } = require("stream/consumers");

// https
//   .get("https://restcountries.com/v3.1/name/turkey", (response) => {
//     let data = "";

//     response.on("data", (chunk) => {
//       data = data + chunk;
//     });
//     response.on("end", () => {
//       const jsonData = JSON.parse(data);
//       console.log(jsonData[0].timezones[0]);
//       console.log(jsonData[0].borders);
//     });
//   })
//   .on("error", (err) => console.log(err.message));
/* ************************************** */
// fetch("https://restcountries.com/v3.1/name/turkey")
//   .then((resp) => resp.json())
//   .then((sonuc) => console.log(sonuc));

/* **************************************** */

const axios = require("axios");

function ulkeBilgileriHavaDurumu(country) {
  axios.get("https://restcountries.com/v3.1/name/" + country).then((resp) => {
    const ulke = resp.data[0];
    const baskent = ulke.capital[0];
    const nufus = ulke.population;
    axios
      .get(
        "http://api.openweathermap.org/geo/1.0/direct?q=" +
          baskent +
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
              "&appid=f79aaf655870e5c2d7e889013765581b&lang=tr&units=metric"
          )
          .then((weathResp) => {
            const wResp = weathResp.data;
            //console.log(wResp);
            const bulut = wResp.weather[0].description;
            //console.log(bulut);
            const derece = wResp.main.temp;
            const hissedilen = wResp.main.feels_like;
            console.log(
              `Ülke adi: ${country}. Baskenti: ${baskent}. Koordinatlari: ${koorLat.toFixed(2)},${koorLon.toFixed(2)}. Hava: ${derece} derece ve ${bulut}. hissedilen: ${hissedilen} `
            );
          })
          .catch((err) => console.log(err));
      });
  });
}

module.exports = ulkeBilgileriHavaDurumu;


