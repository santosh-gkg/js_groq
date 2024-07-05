// groq.js

// Define the base URL of your FastAPI server
const baseUrl = "http://localhost:8000";
import { Groq } from 'groq-sdk';

// Function to send a query to the FastAPI server and get a response
async function runChat(messages,message) {
    const key = import.meta.env.VITE_GROQ_API_KEY;
    const groq = new Groq({ apiKey: key, dangerouslyAllowBrowser: true });
    // console.log(messages)
    const newArray = messages.map((message,index) => ({
      role: message.role,
      content: message.content
  }));
  
    const chatCompletion = await groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "you are a helpful assistant.",
            },
            ...newArray,
            {
                role: "user",
                content: message,
            },
            
        ],
        model: "llama3-8b-8192",
    });

    return chatCompletion.choices[0].message.content;
}

export default runChat;
