const yargs = require("yargs");
const countryCapitalWeather = require("./api-yargs-example");


function run() {
  yargs.command({
    command: "country",
    describe: "decides which country",
    builder: {
      country: {
        describe: "country name",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      countryCapitalWeather(argv.country);
    },
  });

  yargs.parse();
}

module.exports = run;
