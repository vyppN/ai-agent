import OpenAI from "openai";
import {availableTools, tools} from "../tools/tools";
import * as process from "node:process";

/**
 * Represents a weather agent that can provide weather information.
 */
export class WeatherAgent {
    private client: OpenAI;

    private messages = [
        {
            role: 'system',
            content: 'You are a weather agent that provides weather information. Only use functions you have been provided with.'
        }
    ]

    /**
     * Creates a new instance of the WeatherAgent.
     * @param client - An instance of the OpenAI client used for processing weather-related queries.
     */
    constructor(client: OpenAI) {
        this.client = client;
    }

    /**
     * Processes a weather-related question and provides a response.
     * @param message - The weather-related question or query from the user.
     * @returns A Promise that resolves to a string containing the response to the weather query.
     */
    askQuestion = async (message: string): Promise<string> => {
        this.messages.push({ role: 'user', content: message })

        const MAX_ITERATIONS = Object.keys(availableTools).length + 1;
        let iterations = 0;

        while (iterations < MAX_ITERATIONS) {
            const response = await this.client.chat.completions.create({
                model: process.env.OPENAI_MODEL_NAME ?? 'gpt-4o-mini',
                messages: this.messages as any,
                temperature: 0.5,
                tools: tools as any,
            })

            const {finish_reason, message} =  response.choices[0]

            if (finish_reason === 'stop') {
                this.messages.push(message as any)
                return message.content ?? "I don't know"
            }

            if (finish_reason === 'tool_calls') {
                const functionName = message.tool_calls![0].function.name
                const functionToCall = availableTools[functionName]
                const functionArgs = JSON.parse(message.tool_calls![0].function.arguments)
                const functionArgsArray = Object.values(functionArgs)
                const functionResponse = await functionToCall(...functionArgsArray)


                this.messages.push({
                    role: 'function',
                    // @ts-ignore
                    name: functionName,
                    content: `The last function '${functionName}' result is: ${JSON.stringify(functionResponse)}`,
                })
            }

            iterations++
        }

        return "Please try again with a more specific question."
    }
}