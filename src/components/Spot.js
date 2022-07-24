import { useContext } from "react";
import { AppContext } from "../ContextApi";
import styles from "../styles/Game.module.css";

export default function Spot({index,checkWinner,spots}){
    const {playerIndex,setPlayerIndex} = useContext(AppContext);
    
    return <div className={styles.spot} onClick={()=>{
        if(!spots[index]){
            if(playerIndex === 0){
                setPlayerIndex(1);
                spots[index] = "X"
            }
            if(playerIndex === 1){
                setPlayerIndex(0);
                spots[index] = "O"
            }
        }
        checkWinner();
    }}>
    {spots[index]}
    </div>
}