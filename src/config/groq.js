// Define the base URL of your FastAPI server
const baseUrl = "http://localhost:8000";
import {Groq} from 'groq-sdk';
// Function to send a query to the FastAPI server and get a response
async function runChat(query) {
    // const url = `${baseUrl}/ask`;

    // const response = await fetch(url, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ query })
    // });
    // const {Groq} = require('groq-sdk');
    const key=import.meta.env.VITE_GROQ_API_KEY;
    const groq = new Groq({ apiKey: key,dangerouslyAllowBrowser: true});
    // if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    // }

    // const data = await response.json();
    const chatCompletion=groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "you always answer in html format using various tags for a better look and feel.",

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