import React, { useContext } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../config/context';

const Main = () => {
    const { input, setInput, currentChat, chats, sendMessage } = useContext(Context);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage(input);
        }
    };

    const currentChatMessages = chats.find(chat => chat.id === currentChat)?.messages || [];

    return (
        <div className='main'>
            <div className="nav">
                <p>Bhagavad Gita Chatbot</p>
                <img src={assets.bg_icon} alt="" />
            </div>
            <div className="main-container">
                <div className="result">
                    {currentChatMessages.map((message, index) => (
                        <div key={index} className={`message ${message.sender}`}>
                            <p>{message.text}</p>
                        </div>
                    ))}
                </div>
                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            id="input-box"
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder="Hare Krishna, How can I serve you?"
                            onKeyDown={handleKeyPress}
                        />
                        <div>
                            <img id='send' onClick={() => sendMessage(input)} src={assets.send_icon} alt="" />
                        </div>
                    </div>
                    <p className="bottom-info">
                        Chant Hare Krishna And Be Happy
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;
