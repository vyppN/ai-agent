import OpenAI from "openai";

export const translateThaiCityNameToEnglish = async (citiName: string, client: OpenAI) : Promise<string> => {

    const response = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            {
                role: 'system',
                content: 'You are a translator. Translate the Thai city name to English.'
            },
            {
                role: 'user',
                content: citiName
            }
        ],
    })
    return response.choices[0].message.content ?? 'I don\'t know'

}