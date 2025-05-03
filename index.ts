import dotenv from 'dotenv'
import OpenAI from "openai";
import {WeatherAgent} from "./src/agents/weather-agent";
import {StrategyAgent} from "./src/agents/strategy-agent";
import {CriticizeAgent} from "./src/agents/criticize-agent";

dotenv.config()

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const run = async (input: string) => {
    console.log("Thinking about the weather...")
    const weatherAgent = new WeatherAgent(client)
    const weatherResponse = await weatherAgent.askQuestion(input)
    console.log("Suggestion: ",weatherResponse)

    console.log("Thinking about the suggestions...")
    const consultAgent = new StrategyAgent(client)
    const suggestions = await consultAgent.suggestions(weatherResponse)
    console.log("Another Suggestion: ",suggestions)

    console.log("Thinking about the criticism...")
    const criticizeAgent = new CriticizeAgent(client)
    const criticizeResponse = await criticizeAgent.criticize(suggestions)
    console.log("Criticism: ",criticizeResponse)
    return criticizeResponse

}

run("สภาพอากาศวันนี้ออกไปเที่ยวที่ไหนได้บ้าง").then((result: string) => {
    console.log(result)
    console.log("---------------------------------------------------------------------------------")
})
