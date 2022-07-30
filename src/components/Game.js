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
        const winnerSpots = [
            [spots[0],spots[1],spots[2]],
            [spots[0],spots[4],spots[8]],
            [spots[2],spots[4],spots[6]],
            [spots[0],spots[3],spots[6]],
            [spots[2],spots[5],spots[8]],
            [spots[6],spots[7],spots[8]],
            [spots[1],spots[4],spots[7]],
            [spots[3],spots[4],spots[5]]
        ]
        
        winnerSpots.forEach((spot)=>{
            if(spot.every(value => value === "X")){
                setWinner(1)
                setFirstPlayerWinnings(Number(firstPlayerWinnings) + 1)
                localStorage.setItem("firstPlayerWinnings", Number(firstPlayerWinnings) + 1)
            }
            if(spot.every(value => value === "O")){
                setWinner(2)
                setSecondPlayerWinnings(Number(secondPlayerWinnings) + 1)
                localStorage.setItem("secondPlayerWinnings", Number(secondPlayerWinnings) + 1)
            }
        })

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