import { useContext, useState } from "react";
import { AppContext } from "../ContextApi";
import styles from "../styles/Form.module.css";

export default function Form({title,submitTitle,type}){

    const {setStep} = useContext(AppContext);
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");

    const submit = (e)=>{
        e.preventDefault();
        if(type === "firstPlayerForm") localStorage.setItem("firstPlayerName",firstName + " " + lastName);
        if(type === "secondPlayerForm") localStorage.setItem("secondPlayerName",firstName + " " + lastName);
        setStep(step => step+1)
    }
    
    return <div className={styles.main}>
        <header>
            {title}
        </header>
        <form onSubmit={submit}>
            <div className={styles.controls}>
                <input type="text" required placeholder="First Name" onChange={(e)=> setFirstName(e.target.value)} />
                <input type="text" required placeholder="Last Name" onChange={(e)=> setLastName(e.target.value)} />
            </div>
            <button>{submitTitle}</button>
        </form>
    </div>
}