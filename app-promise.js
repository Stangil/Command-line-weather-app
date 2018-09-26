const yargs = require('yargs');
const axios = require('axios');

const argv= yargs
    .options({
        a:{
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
          }
        })
    .help()
    .alias('help', 'h')
    .argv;

    var endodedAddress = encodeURIComponent(argv.address);
    var geocodeUrl =  `http://www.mapquestapi.com/geocoding/v1/address?key=VwHcoJTeWrCXQPe4llKh0Dj0B6Cn2J2T&location= ${endodedAddress}`
//axios knows how to use JSON data and returns a promise
    axios.get(geocodeUrl).then((response)=>{
       // if(response.data.status === 'ZERO_RESULTS') This will not workwith mapquest
       if(response.data.status === 'ZERO_RESULTS'){
           throw new Error('Unable to find address.');
       }
       //----------------------------------------------------------------------------------
       var lat = response.data.results[0].locations[0].latLng.lat;
       var lng = response.data.results[0].locations[0].latLng.lng;
       var weatherUrl = `https://api.darksky.net/forecast/a1a9a06b2dcbab2e5a6761d655958729/${lat},${lng}`
       console.log('City: ', response.data.results[0].locations[0].adminArea5);
       return axios.get(weatherUrl);
    }).then((response)=>{
        var temperature = response.data.currently.temperature;
        var apparentTemperature = response.data.currently.apparentTemperature;
        console.log(`Its currently: ${temperature}, It feels like: ${apparentTemperature}`);
    }).catch((e)=>{
        if(e.code === 'ENOTFOUND'){
            console.log('Unable to connect to servers...');
        }else{
            console.log(e.message);
        }
    });