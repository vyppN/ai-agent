export const getAirQualityIndex = async () : Promise<any> => {
    const url = `https://api.waqi.info/feed/here/?token=${process.env.WAQI_API_KEY}`
    const response = await fetch(url);
    return await response.json()
}