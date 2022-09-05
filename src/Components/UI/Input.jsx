import React from "react";
import { useState } from "react";
import styles from "./input.module.css";



const Input = (props) => {
    const {needBtn, label, id, onChange, onBlur, value } = props.data;
    const inputField = value ? "" : `${styles.remove}`;
    // console.log(props.data.invalidMsg);
    const invalidClass = props.data.isInvalid ? `${styles.invalid}` : ``;
    const filledInputClass = value === "" ? "" : `${styles.mTop}` 
    const [type, setType] = useState(props.data.type)
    const showPassword = () => {
        
        if (type === "password"){
            setType("text");
        }else{
            setType("password")
        }
    }

    return (
        <React.Fragment><div
            className={`${styles.input} ${props.className} ${invalidClass}`} >
            <label htmlFor={id}><span className={inputField} >{label}</span> </label>
           {needBtn ? 
           <>
            <input className={filledInputClass} id={id} type={type} value={value} onChange={onChange} onBlur={onBlur} autoComplete="new-password"></input>
            <button type="button" className={styles.btn} onClick={showPassword}> {type === "password"? "show" : "hide"} </button>
           </>
           
           :  
           <input className={filledInputClass} id={id} type={type} value={value} onChange={onChange} onBlur={onBlur} autoComplete="new-password"></input>}
        
        </div>
            {props.data.isInvalid ? <p className={styles.invalidText}>{props.data.invalidMsg}</p> : ""}
        </React.Fragment>)
}

export default Input