// groq.js

// Define the base URL of your FastAPI server
const baseUrl = "http://localhost:8000";
import { Groq } from 'groq-sdk';
import axios from 'axios';

// Function to send a query to the FastAPI server and get a response
async function runChat(messages,message) {
    // const key = import.meta.env.VITE_GROQ_API_KEY;
    // const groq = new Groq({ apiKey: key, dangerouslyAllowBrowser: true });
    // // console.log(messages)
    const newArray = messages.map((message,index) => ({
      role: message.role,
      content: message.content
  }));
  newArray.push({ role: 'user', content: message });
  const messages_temp = [
    { role: "user", content: "What does Chapter 2, Verse 20 of the Bhagavad Gita say?" }
];
  const response = await axios.post(`${baseUrl}/chat`, {messages:newArray});
  console.log(response.data.response);
  return response.data.response;
  // const response = await fetch(`${baseUrl}/chat`, {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ messages: messages_temp }),
  // });

  
    // const chatCompletion = await groq.chat.completions.create({
    //     messages: [
    //         {
    //             role: "system",
    //             content: "you are a helpful assistant.",
    //         },
    //         ...newArray,
    //         {
    //             role: "user",
    //             content: message,
    //         },
            
    //     ],
    //     model: "llama3-8b-8192",
    // });

    

    // if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    // }

    // const data = await response.json();
    // // return chatCompletion.choices[0].message.content;
    // return data;
}

export default runChat;
