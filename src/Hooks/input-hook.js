import { useState } from "react"



const useInput = (validator) => {
    const [input, setInput] = useState("");
    const [isTouched, setIsTouched] = useState(false);
    // console.log(validator);
    const isValid = validator(input);
    // console.log(isValid);
    const isInvalid = isTouched && isValid !== true;

    const inputHandler = (e) => {
        // console.log("qq");
        setInput(e.target.value);
    }
    const inputBlurHandler = () => {
        setIsTouched(true);
    }
    const reset = ()=>{
        setInput("");
        setIsTouched(false);
    }

    return {
        input,
        setInput,
        isValid,
        isInvalid,
        inputHandler,
        inputBlurHandler,
        reset
    }
}

export default useInput