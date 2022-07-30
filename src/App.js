import { useContext, useEffect, useState } from "react";
import Form from "./components/Form";
import Game from "./components/Game";
import { AppContext } from "./ContextApi";

function App() {
  const {step} = useContext(AppContext);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    setLoading(false);
  },[])

  return !loading &&
     <>
      <h2 style={{textAlign:"center"}}>Welcome to Tic Tac Toe game</h2>
      {step === 1 && <Form title="Add First Player" submitTitle="Continue" type="firstPlayerForm" />}
      {step === 2 && <Form title="Add Second Player" submitTitle="Start game" type="secondPlayerForm" />}
      {step === 3 && <Game />}
    </>
}

export default App;
