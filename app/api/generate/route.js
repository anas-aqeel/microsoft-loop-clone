import { generatedPrompt, model } from "@/app/_utils/continue_writing";
import { streamText, } from "ai";

export async function POST(request) {
    let data = await request.json();
    let prompt = generatedPrompt(data.prompt)

    const stream = await streamText({
        model,
        system: "I will provide a brief passage, and your task is to expand on it by generating new content that seamlessly continues the narrative or theme without directly referencing the original text.\"\n\n**Examples:**\n\n1. **Original Text:** \"The sun dipped below the horizon, painting the sky in hues of orange and pink.\"\n   - **Expanded Text:** \"As the evening settled in, the first stars began to twinkle, casting a gentle light over the tranquil landscape.\"\n\n2. **Original Text:** \"The conference room was filled with anticipation as the CEO prepared to speak.\"\n   - **Expanded Text:** \"Silence fell over the room, every eye fixed on the podium, awaiting the announcement that would shape the company's future.\"\n\n3. **Original Text:** \"She carefully opened the old, dusty book, its pages brittle with age.\"\n   - **Expanded Text:** \"With each turn of the page, she uncovered a world long forgotten, where ancient secrets lay hidden in the faded ink.\"",
        prompt
    });




    return stream.toTextStreamResponse()
}
