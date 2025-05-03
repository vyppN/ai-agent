import OpenAI from "openai";

export class CriticizeAgent {
    private readonly client: OpenAI;
    constructor(client: OpenAI) {
        this.client = client;
    }

    criticize = async (message: string): Promise<string> => {
        const response = await this.client.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: 'You are a decision critic. Review both suggestions and pick the best one. Justify your reasoning.'
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