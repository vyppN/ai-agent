import dotenv from 'dotenv'
import OpenAI from "openai";
import {WeatherAgent} from "./src/agents/weather-agent";
import {SupportAgent} from "./src/agents/support-agent";
import {ConclusionAgent} from "./src/agents/conclusion-agent";
import {buildHtmlFileAndOpen} from "./src/utils/html";

dotenv.config()

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const run = async (userPrompt: string) => {
    console.log('Thinking about the weather...')
    const weatherAgent = new WeatherAgent(client)
    const weatherResponse = await weatherAgent.askQuestion(userPrompt)


    console.log('Suggest another suggestion...')
    const supportAgent = new SupportAgent(client)
    const supportResponse = await supportAgent.optionalSuggestion(weatherResponse)


    console.log('Concluding the decision...')
    const conclusionAgent = new ConclusionAgent(client)
    const conclusionResponse = await conclusionAgent.conclude(weatherResponse, supportResponse)

    buildHtmlFileAndOpen(weatherResponse, supportResponse, conclusionResponse)
}

run("วางแผนการท่องเที่ยวพรุ่งนี้ที่นครศรีธรรมราชให้หน่อย").then(() => {
    console.log("---------------------------------------------------------------------------------")
})
