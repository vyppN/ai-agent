import OpenAI from "openai";

export class StrategyAgent {
    constructor(private readonly client: OpenAI){}

    suggestions = async (message: string): Promise<string> => {
        const response = await this.client.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: 'You are a personal coach. Given the analyst\'s response, suggest another things todo, with pros and cons of your idea and the input idea.'
                },
                {
                    role: 'user',
                    content: message
                }
            ],
        })
        return response.choices[0].message.content ?? 'I don\'t know'
    }
}