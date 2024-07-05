import { createContext, useState, useEffect } from "react";
import runChat from "./groq";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState('');
    const [currentChat, setCurrentChat] = useState(null);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const storedChats = JSON.parse(localStorage.getItem('chats')) || [];
        setChats(storedChats);
    }, []);

    useEffect(() => {
        localStorage.setItem('chats', JSON.stringify(chats));
    }, [chats]);

    const startNewChat = () => {
        const newChat = { id: Date.now(), messages: [] };
        setChats([newChat, ...chats]);
        setCurrentChat(newChat.id);
    };

    const sendMessage = async (message) => {
        const response = await runChat(message);
        setChats(prevChats =>
            prevChats.map(chat =>
                chat.id === currentChat ? { ...chat, messages: [...chat.messages, { sender: 'user', text: message }, { sender: 'bot', text: response }] } : chat
            )
        );
        setInput('');
    };

    const loadChat = (chatId) => {
        setCurrentChat(chatId);
    };

    return (
        <Context.Provider value={{ input, setInput, currentChat, chats, startNewChat, sendMessage, loadChat }}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
