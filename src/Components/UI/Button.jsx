import styles from "./button.module.css"

const Button = (props) => {
    return <button className={`${styles.btn} ${props.className}`}  onClick={props.onClick}>
        {props.children}
    </button>
}

export default Button