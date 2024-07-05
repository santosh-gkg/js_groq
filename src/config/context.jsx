import { createContext, useState} from "react";
import runChat from "./groq";

export const Context= createContext();

const ContextProvider = (props) => {

    const[input,setInput]=useState('');
    const[recentPrompt,setRecentPrompt]=useState('');
    const[prevPrompts,setPrevPrompts]=useState([]);
    const[showResult,setShowResult]=useState(false);
    const[loading,setLoading]=useState(false);
    const[resultData,setResultData]=useState('');
    

    const delayPara=(index,nextWord)=>{
        setTimeout(function(){
            setResultData(prev=>prev+nextWord);
        },index*10
    )
    }

    const newChat=()=>{
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async(prompt)=>{
        setResultData('')
        setLoading(true)
        setShowResult(true)
        let response;
        if(prompt!== undefined){
            response= await runChat(prompt);
            setRecentPrompt(prompt); 
        }
        else{
            setPrevPrompts(prev=>[...prev,input])
            setRecentPrompt(input)
            response= await runChat(input)
        }
        let newResponse=response.split(' ')
        for (let i=0;i<newResponse.length;i++){
            delayPara(i,newResponse[i]+' ')
        }
        setLoading(false)
        setInput('')
    }

    
    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat

    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;