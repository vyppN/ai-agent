import OpenAI from "openai";

export const translatePlaceNameFromThaiToEnglish = async (place: string, client: OpenAI) : Promise<string> => {
    const response = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL_NAME ?? 'gpt-4o-mini',
      messages: [
        { role: 'system', content: `You are a translator. Translate the Thai place name to English` },
        { role: 'user', content: `Translate the place name '${place}' to English` }
      ],
      temperature: 0.1,
    })

    return response.choices[0].message.content ?? "I don't know the place name"
}