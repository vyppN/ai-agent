import OpenAI from "openai";
import process from "node:process";

export class SupportAgent {
    constructor(private readonly client: OpenAI){}

    optionalSuggestion = async (message: string): Promise<string> => {
        const response = await this.client.chat.completions.create({
            model: process.env.OPENAI_MODEL_NAME ?? 'gpt-4o-mini',
            messages: [
                { role: 'system', content: 'You are a support agent that provides optional suggestions and you are a life coach. ' +
                        'You can suggest another things todo, with pros and conds about the input and your decision'  },
                { role: 'user', content: message }
            ],
            temperature: 0.8,
        })

        return response.choices[0].message.content ?? "I support your decision"
    }
}