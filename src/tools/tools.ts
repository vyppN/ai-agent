import {getCurrentWeather} from "./weather";
import {getLocation} from "./location";
import {getAQI} from "./aqi";
import {getGeocoding} from "./geocoding";
import {translateThaiCityNameToEnglish} from "./translator";

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
    },
    {
        type: 'function',
        function: {
            name: 'getGeocoding',
            description: 'Fetches geocoding data for a given city name. If the city name is not English, it should be translated to English before input it.',
            parameters: {
                type: 'object',
                properties: {
                    city: { type:'string' },
                }
            }
        }
    },
    {
        type: 'function',
        function: {
            name: 'translateThaiCityNameToEnglish',
            description: 'Translates a Thai city name to English using the OpenAI API.',
            parameters: {
                type: 'object',
                properties: {
                    cityName: { type: 'string' },
                    client: { type: 'object' },
                }
            }
        }
    }
]

export const availableTools: {[key:string]: Function} = {
    'getLocation': getLocation,
    'getCurrentWeather': getCurrentWeather,
    'getAQI': getAQI,
    'getGeocoding': getGeocoding,
    'translateThaiCityNameToEnglish': translateThaiCityNameToEnglish,
}