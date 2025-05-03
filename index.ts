import dotenv from 'dotenv'
import OpenAI from "openai";
import {WeatherAgent} from "./src/weather-agent";

dotenv.config()

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const run = async () => {
    const agent = new WeatherAgent(client)
    const response = await agent.askQuestion("วันนี้ฝนจะตกไหม")
    console.log(response)
}

run().then(() => {
    console.log("---------------------------------------------------------------------------------")
})
