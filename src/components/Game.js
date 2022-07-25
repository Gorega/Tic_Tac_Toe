import { useContext, useEffect, useState } from "react";
import { AppContext } from "../ContextApi";
import styles from "../styles/Game.module.css";
import Spot from "./Spot";

export default function Game(){
    const [spots,setSpots] = useState([...new Array(9)]);
    const {playerIndex,setStep} = useContext(AppContext);
    const [winner,setWinner] = useState(null);
    const [rePlay,setReplay] = useState(false);
    const [firstPlayerWinnings,setFirstPlayerWinnings] = useState(localStorage.getItem("firstPlayerWinnings"));
    const [secondPlayerWinnings,setSecondPlayerWinnings] = useState(localStorage.getItem("secondPlayerWinnings"));


    const checkWinner = ()=>{
          if((spots[0] === "X" && spots[1] === "X" && spots[2] === "X")
            ||
            (spots[0] === "X" && spots[4] === "X" && spots[8] === "X")
            ||
            (spots[2] === "X" && spots[4] === "X" && spots[6] === "X")
            ||
            (spots[0] === "X" && spots[3] === "X" && spots[6] === "X")
            ||
            (spots[2] === "X" && spots[5] === "X" && spots[8] === "X")
            ||
            (spots[6] === "X" && spots[7] === "X" && spots[8] === "X")
            ||
            (spots[1] === "X" && spots[4] === "X" && spots[7] === "X")
            ||
            (spots[3] === "X" && spots[4] === "X" && spots[5] === "X")
        ){
            setWinner(1)
            setFirstPlayerWinnings(Number(firstPlayerWinnings) + 1)
            localStorage.setItem("firstPlayerWinnings", Number(firstPlayerWinnings) + 1)
        }

         if((spots[0] === "O" && spots[1] === "O" && spots[2] === "O")
            ||
            (spots[0] === "O" && spots[4] === "O" && spots[8] === "O")
            ||
            (spots[2] === "O" && spots[4] === "O" && spots[6] === "O")
            ||
            (spots[0] === "O" && spots[3] === "O" && spots[6] === "O")
            ||
            (spots[2] === "O" && spots[5] === "O" && spots[8] === "O")
            ||
            (spots[6] === "O" && spots[7] === "O" && spots[8] === "O")
            ||
            (spots[1] === "O" && spots[4] === "O" && spots[7] === "O")
            ||
            (spots[3] === "O" && spots[4] === "O" && spots[5] === "O")
            ){
            setWinner(2)
            setSecondPlayerWinnings(Number(secondPlayerWinnings) + 1)
            localStorage.setItem("secondPlayerWinnings", Number(secondPlayerWinnings) + 1)
        }
         if(!spots.includes(undefined)){
            setReplay(true)
        }
    }

    const startNewGameHandler = ()=>{
        setWinner(null);
        setReplay(false);
        setSpots([...new Array(9)]);
    }

    const clearGameHandler = ()=>{
        setStep(1);
        localStorage.setItem("step",1);
        localStorage.setItem("firstPlayerWinnings",0);
        localStorage.setItem("secondPlayerWinnings",0);
    }
    
    useEffect(()=>{
        localStorage.setItem("step",3)
    },[])

    return <div className={styles.main}>
        <header style={{justifyContent:winner && "center"}}>
                <div className={`${styles.patch} ${(playerIndex === 0 || winner === 1) && styles.active}`} style={{display:winner === 2 && "none" }}>
                    <div className={styles.figure}>X</div>
                    <p>Player 1 name: {localStorage.getItem("firstPlayerName")}</p>
                    <span>Winnings: {firstPlayerWinnings ? firstPlayerWinnings : 0}</span>
                </div>
                <div className={`${styles.patch} ${(playerIndex === 1 || winner === 2) && styles.active}`} style={{display:winner === 1 && "none" }}>
                    <div className={styles.figure}>O</div>
                    <p>Player 2 name: {localStorage.getItem("secondPlayerName")}</p>
                    <span>Winnings: {secondPlayerWinnings ? secondPlayerWinnings : 0}</span>
                </div>
        </header>
        
        <main>
            <div className={styles.spots} style={{pointerEvents:winner && "none"}}>
                {spots.map((_,index)=>{
                    return <Spot key={index} index={index} checkWinner={checkWinner} spots={spots} />
                })}
            </div>
            {(winner || rePlay) && <div className={styles.controls}>
                <button onClick={startNewGameHandler}>Start new game</button>
                <button onClick={clearGameHandler}>Reset game with different players</button>
            </div>}
        </main>
    </div>
}