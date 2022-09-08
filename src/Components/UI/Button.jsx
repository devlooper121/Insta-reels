import { prodErrorMap } from "firebase/auth"
import styles from "./button.module.css"

const Button = (props) => {
    return <button className={`${styles.btn} ${props.className}`}  onClick={props.onClick} style={{backgroundColor: props.backgroundColor, borderColor:props.borderColor}}>
        {props.children}
    </button>
}

export default Button