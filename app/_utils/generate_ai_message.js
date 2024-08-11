
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";
import { generatePrompt } from "./prompt";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

let generateTemplate = async (title) => {
    const chatSession = model.startChat({
        generationConfig,
        history: [
            {
                role: "user",
                parts: [
                    { text: "I will provide a topic in the upcoming message. Based on that topic, generate a detailed content template in Markdown format. The template should include the following sections:\n\nTitle: A compelling title for the content.\nIntroduction: An overview of the topic, highlighting its significance and what the reader will learn.\nTable of Contents: A list of all the main sections and sub-sections.\nMain Content:\nSection 1: Introduce the first main point with supporting details.\nSection 2: Elaborate on the second main point with supporting details.\nSection 3: Discuss additional relevant points with subsections as needed.\nConclusion: Summarize key takeaways and suggest further reading or actions.\nReferences: List any sources or additional reading materials.\nEnsure the draft is well-structured with clear headings, bullet points, and links where necessary. The tone should be informative and engaging, suitable for both beginners and experts.\n" },
                ],
            },
            {
                role: "model",
                parts: [
                    { text: "Waiting for your topic! 😊 \n\nPlease provide me with the topic, and I'll generate a detailed content template in Markdown format following your specifications. \n" },
                ],
            },
        ],
    });

    let prompt = generatePrompt(title)
    const result = await chatSession.sendMessage(prompt);
    return result.response.text();
}

export { generateTemplate }