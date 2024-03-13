const yargs = require("yargs");
const countryCapitalWeather = require("./api-yargs-example");

yargs.command({
  command: "country",
  describe: "ulkeye karar verir",
  builder: {
    country: {
      describe: "ulke adi",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    countryCapitalWeather(argv.country);
  },
});

yargs.parse();
