export const getAQI = async () => {
    const url = `https://api.waqi.info/feed/here/?token=${process.env.WAQI_API_KEY}`
    const response = await fetch(url)
    return await response.json()
}