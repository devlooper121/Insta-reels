import Button from "../UI/Button"
import styles from "./dropMessage.module.css"


const DropMessage = (props) => {
    return (
        <div className={styles.msgBox}>
            <p>{props.msg}</p>
            <Button className={styles.btn} onClick={props.onClick}>X</Button>
        </div>
    )
}

export default DropMessage;