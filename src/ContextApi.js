import React, { useEffect, useState } from "react";

export const AppContext = React.createContext();

const AppProvider = (props)=>{
    const [step,setStep] = useState(1);
    const [playerIndex,setPlayerIndex] = useState(0);

    useEffect(()=>{
        if(localStorage.getItem("step") == 3){
          setStep(3)
        }
    },[])

    return <AppContext.Provider value={{
        step,setStep,
        playerIndex,setPlayerIndex,
    }}>
        {props.children}
    </AppContext.Provider>
}

export default AppProvider;