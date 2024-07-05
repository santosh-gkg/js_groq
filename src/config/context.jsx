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
    const saveChatsToLocalStorage = (updatedChats) => {
        localStorage.setItem('chats', JSON.stringify(updatedChats));
        setChats(updatedChats);
    };
    const deleteChat = (chatId) => {
        const updatedChats = chats.filter(chat => chat.id !== chatId);
        console.log('coming here');
        saveChatsToLocalStorage(updatedChats);
    };
    const sendMessage = async (message) => {
        setChats(prevChats =>
            prevChats.map(chat =>
                chat.id === currentChat ? { ...chat, messages: [...chat.messages, { sender: 'user', text: message }] } : chat
            )
        );
        setInput('');
        const response = await runChat(message);
        setChats(prevChats =>
            prevChats.map(chat =>
                chat.id === currentChat ? { ...chat, messages: [...chat.messages, { sender: 'bot', text: response }] } : chat
            )
        );
        
    };

    const loadChat = (chatId) => {
        setCurrentChat(chatId);
    };

    return (
        <Context.Provider value={{ input, setInput, currentChat, chats, startNewChat, sendMessage, loadChat,deleteChat}}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
