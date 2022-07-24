import React, { useState } from "react";

export const AppContext = React.createContext();

const AppProvider = (props)=>{
    const [step,setStep] = useState(1);
    const [playerIndex,setPlayerIndex] = useState(0);

    return <AppContext.Provider value={{
        step,setStep,
        playerIndex,setPlayerIndex,
    }}>
        {props.children}
    </AppContext.Provider>
}

export default AppProvider;