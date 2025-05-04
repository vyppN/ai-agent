import dotenv from 'dotenv'
import OpenAI from "openai";
import {WeatherAgent} from "./src/agents/weather-agent";
import {StrategyAgent} from "./src/agents/strategy-agent";
import {CriticizeAgent} from "./src/agents/criticize-agent";
import {generateHtml, openInBrowser} from "./src/utils/html";
import * as fs from "node:fs";

dotenv.config()

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const generateReport = async (weatherReport: string, suggestion: string, criticize: string) => {
    const html = generateHtml(weatherReport, suggestion, criticize)
    const fileName = 'weather-report.html'
    fs.writeFile(fileName, html, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        openInBrowser(fileName)
        console.log("Report generated successfully!");
    })
}

const run = async (input: string) => {
    console.log("Thinking about the weather...")
    const weatherAgent = new WeatherAgent(client)
    const weatherResponse = await weatherAgent.askQuestion(input)

    console.log("Thinking about the suggestions...")
    const consultAgent = new StrategyAgent(client)
    const suggestions = await consultAgent.suggestions(weatherResponse)

    console.log("Thinking about the criticism...")
    const criticizeAgent = new CriticizeAgent(client)
    const criticizeResponse = await criticizeAgent.criticize(suggestions)

    await generateReport(weatherResponse, suggestions, criticizeResponse)
}

run("พรุ่งนี้ที่สงขลาออกไปเที่ยวที่ไหนได้บ้าง").then(() => {

    console.log("---------------------------------------------------------------------------------")
})
