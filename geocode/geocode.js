const request = require('request');

var geocodeAddress = (address, callback) =>{
    var endodedAddress = encodeURIComponent(address);
request({
    url:`http://www.mapquestapi.com/geocoding/v1/address?key=VwHcoJTeWrCXQPe4llKh0Dj0B6Cn2J2T&location= ${endodedAddress}`,
    json: true
}, (error, response, body) => {
    if(error){
        callback('Unable to connect to Mapquest servers...');
    }else if(body.results[0].locations[0].adminArea5 === ""){
        callback('No results for that address...');
    }else{
        callback(undefined, {
            City: body.results[0].locations[0].adminArea5,
            latitude: body.results[0].locations[0].latLng.lat,
            longitude: body.results[0].locations[0].latLng.lng
        });
    }
});
};
module.exports.geocodeAddress = geocodeAddress;