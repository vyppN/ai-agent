import {getCurrentWeather} from "./weather";
import {getLocation} from "./location";
import {getAQI} from "./aqi";

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
        function: {
            name: 'getAQI',
            description: 'Fetches the Air Quality Index (AQI) data for the current location (This API knows the location of the user).',
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
    'getAQI': getAQI,
}