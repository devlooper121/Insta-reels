import React, { useState} from "react"
import { Link } from "react-router-dom"
import { auth } from "../../firebase"
import { signInWithEmailAndPassword} from "firebase/auth"


import Input from "../UI/Input"
import Card from "../UI/Card"
import Button from "../UI/Button"
import Loding from "../UI/loding"
// style sheet
import styles from "./login.module.css"
import Logo from "../welcome/logo"
//custom hook
import useInput from "../../Hooks/input-hook"
// important function
import { emailValidation, passwordValidator } from "../functions/validation"



function Login() {
    const [loder, setLoder] = useState(false);
    const [error, setError] = useState("");

    // states for login, 1.Loding, 2.Error, 3.userFound
    // const [mainLoder, setML] = useState(true) // now we use from AuthContext.js

    // email 
    const {
        input: email, 
        isValid: isEmailValid,
        isInvalid: isEmailInputInvalid,
        inputHandler: emailHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmail
    } = useInput(emailValidation);
    // password
    const {
        input: password, 
        isValid: isPasswordValid,
        isInvalid: isPasswordInputInvalid,
        inputHandler: passwordHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: resetPassword
    } = useInput(passwordValidator)

    let isFormValid = false;
    if(isEmailValid === true && isPasswordValid === true){
        isFormValid = true;
    }

    const loginHandler = async (e) => {
        e.preventDefault();
        if(isFormValid){
            try {
                setLoder(true)
                await signInWithEmailAndPassword(auth, email, password)
                setLoder(false)
            } catch (err) {
                setLoder(false)
                setError(err.message);
                setTimeout(() => {
                    setError("")
                }, 2000)
            }
            resetEmail();
            resetPassword();
        }else{
            return
        }
    }

    return (
        loder === true ? <Loding/> : 
        <div className={styles.loginCont}>
            <Card className={styles.loginCard}>
                <Logo />
                {error !== "" ? error :
                <form onSubmit={loginHandler}>
                    <Input data={
                        { type: "email",
                         value: email, 
                         onChange: emailHandler,
                         onBlur: emailBlurHandler,
                         id: "email", 
                         label: "Email",
                         invalidMsg: isEmailValid,
                         isInvalid: isEmailInputInvalid  }
                         } />
                    <Input data={
                        { type: "password",
                        value: password,
                        onChange: passwordHandler,
                        onBlur: passwordBlurHandler, 
                        id: "password", 
                        label: "Password",
                        invalidMsg: isPasswordValid,
                        isInvalid: isPasswordInputInvalid,
                        needBtn:true }
                        } />

                    <Button disabled={isFormValid} className={styles.btnIN} type="submit"  >{"Login"}</Button>

                </form>}
                <div className={styles.separatoer}>
                    <div className={styles["left"]}></div>
                    <p>or</p>
                    <div className={styles["left"]}></div>
                </div>
            </Card>
            <Card> <p>Don't Have an account ?<Link to="/signup" className={styles.link}> Sign in </Link> </p> </Card>
        </div>
    )
}
export default Login