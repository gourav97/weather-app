const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=83aa9d4fbb84e45984ea5217f98a6806&query=${latitude},${longitude}`;

    request({url : url, json: true}, (error, {body}) => {
        if(error){
            callback("Unable to connect to server", undefined)
        }else if(body.error){
            callback("Incorrect coordinates, try again", undefined)

        }
        else {
            const {temperature, feelslike, weather_descriptions} = body.current
            const data= `${weather_descriptions[0]}. It is currently ${temperature} degree out, but it feels like ${feelslike} degree out`
            callback(undefined, data)
        }
    })
}

module.exports = {
    forecast : forecast
}