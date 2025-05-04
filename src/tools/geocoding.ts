export const getGeocoding = async (city: string) : Promise<any> => {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    const response = await fetch(url)
    const data = await response.json()
    return data.results[0]
}