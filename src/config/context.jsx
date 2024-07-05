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
       
        saveChatsToLocalStorage(updatedChats);
    };
    const sendMessage = async (message) => {
        
        setChats(prevChats =>
            prevChats.map(chat =>
                chat.id === currentChat ? { ...chat, messages: [...chat.messages, { role: 'user', content: message }] } : chat
            )
        );
        setInput('');
        const response = await runChat(message);
        console.log(response);
        let responsearray = response.split('\n\n');
        let newarray="";
        for (let i=0; i<responsearray.length; i++){
            if (i===0 || i%2!==1){
                newarray = newarray + responsearray[i];
            }
            else{
                newarray = newarray +"<br><br>"+responsearray[i] +"<br><br>" ;
            }
        }
        let newarray1 = newarray.split('**');
        let newarray2="";
        for (let i=0; i<newarray1.length; i++){
            if (i===0 || i%2!==1){
                newarray2 = newarray2 + newarray1[i];
            }
            else{
                newarray2 = newarray2 +"<b>"+newarray1[i] +" </b>" ;
            }
        }
        setChats(prevChats =>
            prevChats.map(chat =>
                chat.id === currentChat ? { ...chat, messages: [...chat.messages, { role: 'assistant', content: newarray2 }] } : chat
            )
        );
    };
        


    const loadChat = (chatId) => {
        setCurrentChat(chatId);
    };

    return (
        <Context.Provider value={{ input, setInput, currentChat, chats, startNewChat, sendMessage, loadChat, deleteChat}}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
