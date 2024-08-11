export const generatePrompt = (title) => {
    return (`
    Create a detailed content template in Markdown format on the topic: ${title}. The template should include the following sections:

    Title: A compelling title for the content.
    Introduction: A brief overview of the topic, highlighting its importance and what the reader will learn.
    Table of Contents: A list of all the main sections and sub-sections.
    Main Content:
    Section 1: Introduce the first main point, with subsections for supporting details.
    Section 2: Expand on the second main point, with subsections for supporting details.
    Section 3: Discuss additional relevant points, with subsections as needed.
    Conclusion: Summarize the key takeaways and suggest further reading or actions.
    References: A section for listing any sources or further reading materials.
    Ensure that the draft is well-structured, with clear headings, bullet points, and links where necessary. The tone should be informative and engaging, suitable for both beginners and experts.
    `)
}