
// import {
//     GoogleGenerativeAI,


// } from "@google/generative-ai";

// const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-pro",
// });

// const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 64,
//     maxOutputTokens: 8192,
//     responseMimeType: "text/plain",
// };

// let history = [
//     {
//         role: "user",
//         parts: [
//             { text: "Here's a rewritten version of your prompt:\n\n\"I will provide a brief passage, and your task is to expand on it by generating new content that seamlessly continues the narrative or theme without directly referencing the original text.\"\n\n**Examples:**\n\n1. **Original Text:** \"The sun dipped below the horizon, painting the sky in hues of orange and pink.\"\n   - **Expanded Text:** \"As the evening settled in, the first stars began to twinkle, casting a gentle light over the tranquil landscape.\"\n\n2. **Original Text:** \"The conference room was filled with anticipation as the CEO prepared to speak.\"\n   - **Expanded Text:** \"Silence fell over the room, every eye fixed on the podium, awaiting the announcement that would shape the company's future.\"\n\n3. **Original Text:** \"She carefully opened the old, dusty book, its pages brittle with age.\"\n   - **Expanded Text:** \"With each turn of the page, she uncovered a world long forgotten, where ancient secrets lay hidden in the faded ink.\"" },
//         ],
//     },
//     {
//         role: "model",
//         parts: [
//             { text: "I understand!  I like this version much better. \n\nPlease feel free to provide your brief passage and I'll do my best to seamlessly expand on it. I'm excited to see what creative writing prompts you come up with! \n" },
//         ],
//     },
//     {
//         role: "user",
//         parts: [
//             { text: "The storm raged outside, the wind howling through the trees like a wild beast" },
//         ],
//     },
//     {
//         role: "model",
//         parts: [
//             { text: "Rain lashed against the windows, each gust a clawing hand trying to force its way inside.  The old house groaned in protest, timbers creaking under the onslaught.  Inside, a fire crackled defiantly in the hearth, casting flickering shadows that danced with the frantic movements of the wind outside. \n" },
//         ],
//     },
//     {
//         role: "user",
//         parts: [
//             { text: "She took a deep breath, letting her imagination flow freely, and with a swift motion, the brush met the canvas, bringing her vision to life." },
//         ],
//     },
//     {
//         role: "model",
//         parts: [
//             { text: "Colors swirled and blended, transforming the blank surface into a vibrant dreamscape. With each stroke, she breathed life into her creation: a hidden world of whispering forests, shimmering waterfalls, and mythical creatures with eyes that seemed to glow from within.  It was a place of untamed beauty, born from the depths of her imagination and taking form under her hand. \n" },
//         ],
//     },
//     {
//         role: "user",
//         parts: [
//             { text: "The bustling city streets were filled with people hurrying to their destinations, each lost in their own world." },
//         ],
//     },
//     {
//         role: "model",
//         parts: [
//             { text: "A symphony of urban chaos rose above the crowd: the blare of car horns, the rumble of a passing bus, snatches of conversations fading in and out.  A street musician's melody soared above the din, a bittersweet counterpoint to the city's relentless pulse.  Despite the anonymity of the crowds, there was a strange comfort in being surrounded by the ebb and flow of so many lives, all interconnected yet moving to their own rhythms. \n" },
//         ],
//     },
//     {
//         role: "user",
//         parts: [
//             { text: "The old oak tree stood tall and proud, its roots deeply embedded in the earth." },
//         ],
//     },
//     {
//         role: "model",
//         parts: [
//             { text: "It had stood as a silent sentinel for generations, its gnarled branches reaching towards the heavens like the arms of a wise elder. Countless seasons had passed, leaving their mark on its rough bark: the etchings of time, the whispers of long-forgotten storms. Yet, it stood firm, a symbol of enduring strength and quiet resilience in a world of constant change. \n" },
//         ],
//     },
// ]


// let continueGeneration = async (text) => {
//     const chatSession = model.startChat({
//         generationConfig,
//         history
//     });

//     let prompt = `Here is the context text in md format ${text}. Using the context, expand on it by generating up to 3 lines of new content that continues the narrative or theme without referencing the original passage.`

//     const result = await chatSession.sendMessage(prompt);
//     return result.response.text();
// }

// export { continueGeneration }





import { createGoogleGenerativeAI } from '@ai-sdk/google';


const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;


const google = createGoogleGenerativeAI({
    apiKey,
});
const model = google('models/gemini-1.5-pro-latest', {});


let generatedPrompt = (text) => {
    return `Here is the context text in text format ${text}. Using the context, expand on it by generating up to 3 lines of new content that continues the narrative or theme without referencing the original passage.`
}




export { model, generatedPrompt }