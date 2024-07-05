// Define the base URL of your FastAPI server
const baseUrl = "http://localhost:8000";
import {Groq} from 'groq-sdk';
// Function to send a query to the FastAPI server and get a response
async function runChat(query) {

    const key=import.meta.env.VITE_GROQ_API_KEY;
    const groq = new Groq({ apiKey: key,dangerouslyAllowBrowser: true});

    const chatCompletion=groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "you are a helpful bot which generate content in html format. use div blocks to structure your content. don't use large font size, for heading use h3, subtitles in h2 and paragraph in p tag. you can also bold and italics",

            },
          {
            role: "user",
            content: query,
          },
        ],
        model: "llama3-70b-8192",
    });

    return (await chatCompletion).choices[0].message.content;
    // return data.response;
}
export default runChat;