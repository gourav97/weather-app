const request = require('request')


const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZ291cmF2MTk5NyIsImEiOiJjbDVxcmNuOTcxNWloM2pvZWtmYjdwNWVsIn0.rl0lMO8YrhHDBde_G3dnAg&limit=1`

    request({url : url, json: true}, (error, {body})=> {
        if(error){
            callback("unable to connect to location services", undefined)
        }
        else if(body.features.length === 0){
            callback("No result found, try with different result", undefined)
        }
        else{
            const {center} = body.features[0]
            const data = {
                latitude : center[1],
                longitude :center[0],
                location : body.query[0]
            }
            callback(undefined, data)
        }
        


    })
}

module.exports =  {
     geocode : geocode
}