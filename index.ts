import dotenv from 'dotenv'
import OpenAI from "openai";
import {WeatherAgent} from "./src/agents/weather-agent";
import {SupportAgent} from "./src/agents/support-agent";
import {ConclusionAgent} from "./src/agents/conclusion-agent";

dotenv.config()

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const run = async (userPrompt: string) => {
    console.log('Thinking about the weather...')
    const weatherAgent = new WeatherAgent(client)
    const weatherResponse = await weatherAgent.askQuestion(userPrompt)
    console.log(weatherResponse)

    console.log('Suggest another suggestion...')
    const supportAgent = new SupportAgent(client)
    const supportResponse = await supportAgent.optionalSuggestion(weatherResponse)
    console.log(supportResponse)

    console.log('Concluding the decision...')
    const conclusionAgent = new ConclusionAgent(client)
    const conclusionResponse = await conclusionAgent.conclude(weatherResponse, supportResponse)
    console.log(conclusionResponse)
}

run("วางแผนการท่องเที่ยวพรุ่งนี้ให้หน่อย").then(() => {
    console.log("---------------------------------------------------------------------------------")
})
