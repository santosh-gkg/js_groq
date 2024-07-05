import React,{useContext} from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../config/context'
const Main = () => {


    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input,prevPrompts}=useContext(Context)
    const handleCardClick = (text) => {
        setInput(text);
    };
    // clicking the send button when presses enter in input box

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            onSent();
        }
    };

  return (
    <div className='main'>
        <div className="nav">
            <p>Bhagvad Gita chatbot</p>
            <img src={assets.bg_icon} alt=""  />
        </div>
        <div className="main-container">

            {!showResult
            ?<>
                <div className="greet">
                        <p className=""><span>Hare Krishna</span></p>
                        <p>How can I server you today?</p>
                    </div>
                    <div className="cards">
                        <div onClick={() => handleCardClick("What is soul?")} className="card">
                            <p>What is soul?</p>
                            <img src={assets.question_mark_icon} alt="" />
                        </div>
                        <div onClick={() => handleCardClick("what are the main teachings given by krishna to arjuna?")} className="card">
                            <p>what are the main teachings given by krishna to arjuna?</p>
                            <img src={assets.glowing_bulb_icon} alt="" />
                        </div>
                        <div onClick={() => handleCardClick("How to deal with my anger?")} className="card">
                            <p>How to deal with my anger?</p>
                            <img src={assets.brain_icon} alt="" />
                        </div>
                        <div onClick={() => handleCardClick("How to come out of depression?")} className="card">
                            <p>How to come out of depression?</p>
                            <img src={assets.bulb_icon} alt="" />
                </div>
            </div>
            
            </>:
            <div className="result">
                <div className="result-title">  
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPrompt}</p>

                </div>

                <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                    {loading
                    ?<div className="loader">
                        <hr />
                        <hr />
                        <hr />
                    </div>:
                    // <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                    <div className="output" dangerouslySetInnerHTML={{__html:resultData}}>
                        
                    </div> 
                }                   
                </div>
            </div>
            
            }
            
            


            <div className="main-bottom">
                <div className="search-box">
                    <input 
                    id="input-box"
                    onChange={(e)=>setInput(e.target.value)} 
                    value={input} 
                    type="text" 
                    placeholder="Hare Krishna, How can Serve you?" 
                    onKeyDown={handleKeyPress}
                    />
                    <div>
                        
                        <img id='send' onClick={()=>onSent()} src={assets.send_icon} alt="" />
                        
                    </div>
                </div>
                <p className="bottom-info">
                        Chant Hare Krishna And Be Happy
                    </p>
            </div>
        </div>
    </div>
  )
  
}

export default Main
