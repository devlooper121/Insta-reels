import React, { useState } from "react"
import { Link } from "react-router-dom"

import { auth} from "../../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"

import useInput from "../../Hooks/input-hook"
import { emailValidation, passwordValidator, nameValidator } from "../functions/validation"

import Card from "../UI/Card"
import Input from "../UI/Input"
import Button from "../UI/Button"
import Logo from "../welcome/logo"

import styles from "../login/login.module.css"
import { setDataWithID } from "../functions/util"

function Signup() {
    const [error, setError] = useState("")
    const [loder, setLoder] = useState(false)

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
    // name
    const {
        input: name,
        isValid: isNameValid,
        isInvalid: isNameInputInvalid,
        inputHandler: nameHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetName
    } = useInput(nameValidator);

    let isFormValid = false;
    if (isEmailValid === true && isPasswordValid === true && isNameValid === true) {
        isFormValid = true;
    }

    const signupEmailPassword = async (e) => {
        e.preventDefault();
        if (isFormValid) {
            try {
                setError("")
                setLoder(true)
                const userCred = await createUserWithEmailAndPassword(auth, email, password);
                setDataWithID("users",userCred.user.uid, {
                    email,
                    name,
                    postIds: [],
                    userId: userCred.user.uid,
                    profileImgUrls: ["https://idronline.org/wp-content/uploads/2021/01/Screen-Shot-2019-02-19-at-1.23.40-PM-300x300-3.jpg.webp"]
                })
            } catch (err) {
                setError(err.message)
                setTimeout(()=>{
                    setError("");
                },2000)
            }
            setLoder(false)
            resetEmail();
            resetName();
            resetPassword();
        } else {
            return
        }

    }

    return (
        <div className={styles.loginCont}>
            <Card>
                <Logo />
                {error !== "" ? error :
                    <form onSubmit={signupEmailPassword} >
                        <Input data={
                            {
                                type: "email",
                                value: email,
                                onChange: emailHandler,
                                onBlur: emailBlurHandler,
                                id: "email",
                                label: "Email",
                                invalidMsg: isEmailValid,
                                isInvalid: isEmailInputInvalid
                            }
                        } />
                        <Input data={
                            {
                                type: "password",
                                value: password,
                                onChange: passwordHandler,
                                onBlur: passwordBlurHandler,
                                id: "password",
                                label: "Password",
                                invalidMsg: isPasswordValid,
                                isInvalid: isPasswordInputInvalid,
                                needBtn: true
                            }
                        } />
                        <Input data={
                            {
                                type: "text",
                                value: name,
                                onChange: nameHandler,
                                onBlur: nameBlurHandler,
                                id: "name",
                                label: "Name",
                                invalidMsg: isNameValid,
                                isInvalid: isNameInputInvalid
                            }
                        } />

                        <Button className={styles.btnIN} type="submit">{loder? "loding..." :"Sign up" }</Button>
                    </form>}
                <div className={styles.separatoer}>
                    <div className={styles["left"]}></div>
                    <p>or</p>
                    <div className={styles["left"]}></div>
                </div>
            </Card>
            <Card>
                <p>Have an account ?<Link to="/login" className={styles.link}> Log in </Link></p>
            </Card>
        </div>
    )
}

export default Signup