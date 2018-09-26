const request = require('request');

var geocodeAddress = (address)=>{
    return new Promise((resolve, reject)=>{
        var endodedAddress = encodeURIComponent(address);
    request({
        url:`http://www.mapquestapi.com/geocoding/v1/address?key=VwHcoJTeWrCXQPe4llKh0Dj0B6Cn2J2T&location= ${endodedAddress}`,
        json: true
    }, (error, response, body) => {
            if(error){
                reject('Unable to connect to Mapquest servers...');
            }else if(body.results[0].locations[0].adminArea5 === ""){
                reject('No results for that address...');
            }else{
            resolve({
                City: body.results[0].locations[0].adminArea5,
                latitude: body.results[0].locations[0].latLng.lat,
                longitude: body.results[0].locations[0].latLng.lng
                });
            }
        });
    });
};


geocodeAddress('19146').then((location)=>{
    console.log(JSON.stringify(location, undefined,2));
},(errorMessage)=>{
    console.log(errorMessage);
});
