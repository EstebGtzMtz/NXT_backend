const axios = require('axios');

const convertTimestamp = (sunrise, sunset) => {
    const convertedSunrise = new Date(sunrise * 1000).toString().slice(16, 24)
    const convertedSunset = new Date(sunset * 1000).toString().slice(16, 24)
    return { convertedSunrise, convertedSunset }
}

exports.getSunriseSunsetFromOpenWeatherAPI = async() => {
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=19.42&lon=-99.12&exclude=hourly,daily&appid=${process.env.WEATHER_API}`)
    const { data: { current: { sunrise, sunset } } } = res;
    const stringifyData = convertTimestamp(sunrise, sunset);
    return stringifyData
}