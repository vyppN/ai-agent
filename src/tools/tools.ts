import {getCurrentWeather} from "./weather";
import {getLocation} from "./location";
import {getAirQualityIndex} from "./aqi";

export const tools = [
    {
        type: 'function',
        function: {
            name: 'getLocation',
            description: 'Fetches the location data of the user based on their IP address.',
            parameters: {
                type: 'object',
                properties: {}
            }
        }
    },
    {
        type: 'function',
        function:{
            name: 'getCurrentWeather',
            description: 'Fetches the current weather data for a given location.',
            parameters: {
                type: 'object',
                properties: {
                    latitude: { type: 'string' },
                    longitude: { type: 'string' },
                }
            }
        }
    },
    {
        type: 'function',
        function:{
            name: 'getAirQualityIndex',
            description: 'Fetches the air quality index (AQI) data for current location. (This API knows the user location)',
            parameters: {
                type: 'object',
                properties: {}
            }
        }
    }
]

export const availableTools: {[key:string]: Function} = {
    'getLocation': getLocation,
    'getCurrentWeather': getCurrentWeather,
    'getAirQualityIndex': getAirQualityIndex,
}