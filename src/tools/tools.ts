import {getCurrentWeather} from "./weather";
import {getLocation} from "./location";
import {getAirQualityIndex} from "./aqi";
import {getGeocoding} from "./geocoding";
import {translatePlaceNameFromThaiToEnglish} from "./translator";

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
    },
    {
        type: 'function',
        function: {
            name: 'getGeocoding',
            description: 'Fetches geocoding data for a given place. If the place name is not in English, it will be translated to English before input it.',
            parameters: {
                type: 'object',
                properties: {
                    place: { type: 'string' }
                }
            }
        }
    },
    {
        type: 'function',
        function: {
            name: 'translatePlaceNameFromThaiToEnglish',
            description: 'Translates a place name from Thai to English.',
            parameters: {
                type: 'object',
                properties: {
                    place: { type: 'string' }
                }
            }
        }
    }
]

export const availableTools: {[key:string]: Function} = {
    'getLocation': getLocation,
    'getCurrentWeather': getCurrentWeather,
    'getAirQualityIndex': getAirQualityIndex,
    'getGeocoding': getGeocoding,
    'translatePlaceNameFromThaiToEnglish': translatePlaceNameFromThaiToEnglish
}