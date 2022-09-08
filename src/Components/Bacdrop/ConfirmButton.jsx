import { Backdrop1 } from "./backdrop";
import styles from "./ConfirmButton.module.css"
import Button from "../UI/Button"

const ConfirmButton = (props) => {
    console.log();
    return(
        <Backdrop1 z={props.z} onClick={props.onCancle}>
            <div className={styles.container}>
                <div className={styles.message}>{props.message}</div>
                <div className={styles.btn_container}>
                    <Button className={styles.btn1} borderColor={props.cancleColor} onClick={props.onCancle}> Cancle</Button>
                    <Button className={styles.btn2} backgroundColor={props.confirmColor} onClick={props.onConfirm}>Confirm</Button>
                </div>
            </div>
        </Backdrop1>
    )
}

export default ConfirmButton;